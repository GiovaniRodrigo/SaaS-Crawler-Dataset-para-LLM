document.addEventListener('DOMContentLoaded', async () => {
    const tokenInput = document.getElementById('token');
    const projectSelect = document.getElementById('project');
    const captureBtn = document.getElementById('capture');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    const settings = await chrome.storage.local.get(['token', 'project_id']);
    if (settings.token) {
        tokenInput.value = settings.token;
        loadProjects(settings.token, settings.project_id);
    }

    tokenInput.addEventListener('change', () => {
        chrome.storage.local.set({ token: tokenInput.value });
        loadProjects(tokenInput.value);
    });

    async function loadProjects(token, savedProjectId) {
        try {
            const res = await fetch('http://localhost:8000/api/extension/projects', {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            const projects = await res.json();
            projectSelect.innerHTML = projects.map(p => 
                `<option value="${p.id}" ${p.id == savedProjectId ? 'selected' : ''}>${p.name}</option>`
            ).join('');
        } catch (e) {
            statusDiv.textContent = 'Erro ao carregar projetos.';
        }
    }

    captureBtn.addEventListener('click', async () => {
        const token = tokenInput.value;
        const projectId = projectSelect.value;
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

            const res = await fetch('http://localhost:8000/api/extension/captures', {
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
