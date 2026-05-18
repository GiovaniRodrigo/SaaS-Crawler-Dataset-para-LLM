import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEvent } from 'react';

interface Props {
    project: Project;
}

export default function Create({ project }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        seed_urls: [''],
        max_depth: 3,
        max_pages: 100,
    });

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...data.seed_urls];
        newUrls[index] = value;
        setData('seed_urls', newUrls);
    };

    const addUrl = () => {
        setData('seed_urls', [...data.seed_urls, '']);
    };

    const removeUrl = (index: number) => {
        const newUrls = [...data.seed_urls];
        newUrls.splice(index, 1);
        setData('seed_urls', newUrls);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('projects.crawl-jobs.store', project.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Novo Job de Crawling - {project.name}
                </h2>
            }
        >
            <Head title="Novo Job" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel value="Seed URLs (URLs iniciais)" />
                                {data.seed_urls.map((url, index) => (
                                    <div key={index} className="flex mt-1 gap-2">
                                        <TextInput
                                            type="url"
                                            value={url}
                                            className="block w-full"
                                            onChange={(e) => handleUrlChange(index, e.target.value)}
                                            placeholder="https://exemplo.com.br"
                                            required
                                        />
                                        {data.seed_urls.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeUrl(index)}
                                                className="text-red-600 hover:text-red-900 px-2"
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addUrl}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    + Adicionar outra URL
                                </button>
                                <InputError message={errors.seed_urls} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div>
                                    <InputLabel htmlFor="max_depth" value="Profundidade Máxima" />
                                    <TextInput
                                        id="max_depth"
                                        type="number"
                                        value={data.max_depth}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('max_depth', parseInt(e.target.value))}
                                        min="0"
                                        max="10"
                                    />
                                    <InputError message={errors.max_depth} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="max_pages" value="Limite de Páginas" />
                                    <TextInput
                                        id="max_pages"
                                        type="number"
                                        value={data.max_pages}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('max_pages', parseInt(e.target.value))}
                                        min="1"
                                        max="10000"
                                    />
                                    <InputError message={errors.max_pages} className="mt-2" />
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-end">
                                <PrimaryButton disabled={processing}>
                                    Criar Job
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
