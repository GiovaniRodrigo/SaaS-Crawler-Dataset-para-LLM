document.addEventListener('DOMContentLoaded', async () => {
    const apiUrlInput = document.getElementById('api_url');
    const tokenInput = document.getElementById('token');
    const projectSelect = document.getElementById('project');
    const captureBtn = document.getElementById('capture');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    const settings = await chrome.storage.local.get(['api_url', 'token', 'project_id']);
    const apiUrl = settings.api_url || 'http://localhost:8000';
    apiUrlInput.value = apiUrl;

    if (settings.token) {
        tokenInput.value = settings.token;
        loadProjects(apiUrl, settings.token, settings.project_id);
    }

    apiUrlInput.addEventListener('change', () => {
        const url = apiUrlInput.value.trim().replace(/\/$/, ''); // Remove trailing slash
        chrome.storage.local.set({ api_url: url });
        if (tokenInput.value) {
            loadProjects(url, tokenInput.value);
        }
    });

    tokenInput.addEventListener('change', () => {
        chrome.storage.local.set({ token: tokenInput.value });
        const url = apiUrlInput.value.trim().replace(/\/$/, '');
        loadProjects(url, tokenInput.value);
    });

    projectSelect.addEventListener('change', () => {
        chrome.storage.local.set({ project_id: projectSelect.value });
    });

    async function loadProjects(url, token, savedProjectId) {
        try {
            const res = await fetch(`${url}/api/extension/projects`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            const projects = await res.json();
            projectSelect.innerHTML = projects.map(p => 
                `<option value="${p.id}" ${p.id == savedProjectId ? 'selected' : ''}>${p.name}</option>`
            ).join('');
            if (projects.length > 0 && !savedProjectId) {
                chrome.storage.local.set({ project_id: projects[0].id });
            }
        } catch (e) {
            statusDiv.textContent = 'Erro ao carregar projetos.';
        }
    }

    captureBtn.addEventListener('click', async () => {
        const token = tokenInput.value;
        const projectId = projectSelect.value;
        const url = apiUrlInput.value.trim().replace(/\/$/, '');

        if (!token || !projectId) {
            statusDiv.textContent = 'Token e Projeto são obrigatórios.';
            return;
        }

        statusDiv.textContent = 'Capturando...';
        captureBtn.disabled = true;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => ({
                    url: window.location.href,
                    title: document.title,
                    text: document.body.innerText
                })
            });

            const data = results[0].result;
            data.project_id = projectId;

            const res = await fetch(`${url}/api/extension/captures`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (res.ok) {
                statusDiv.textContent = 'Sucesso! Página capturada.';
            } else {
                statusDiv.textContent = 'Erro: ' + (result.message || 'Desconhecido');
            }
        } catch (e) {
            statusDiv.textContent = 'Erro na captura: ' + e.message;
        } finally {
            captureBtn.disabled = false;
        }
    });
});
