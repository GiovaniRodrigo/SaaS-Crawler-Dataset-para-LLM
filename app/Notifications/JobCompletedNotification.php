<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\CrawlJob;

class JobCompletedNotification extends Notification
{
    use Queueable;

    public function __construct(public CrawlJob $job)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $status = $this->job->status === 'completed' ? 'concluído com sucesso' : 'finalizado com falhas';
        return [
            'job_id' => $this->job->id,
            'project_name' => $this->job->project->name,
            'message' => "O Job #{$this->job->id} do projeto '{$this->job->project->name}' foi {$status}.",
            'status' => $this->job->status,
        ];
    }
}

