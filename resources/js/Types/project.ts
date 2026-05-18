export interface Project {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
    domains?: Domain[];
    crawl_jobs?: CrawlJob[];
    documents_count?: number;
    chunks_count?: number;
}

export interface Domain {
    id: number;
    project_id: number;
    domain: string;
    allow_subdomains: boolean;
    created_at: string;
    updated_at: string;
}

export interface CrawlJob {
    id: number;
    project_id: number;
    status: 'created' | 'running' | 'completed' | 'failed' | 'canceled';
    seed_urls: string[];
    allow_paths: string[] | null;
    deny_paths: string[] | null;
    max_depth: number;
    max_pages: number;
    total_discovered: number;
    total_crawled: number;
    total_failed: number;
    total_documents: number;
    total_chunks: number;
    started_at: string | null;
    finished_at: string | null;
    created_at: string;
    updated_at: string;
}
