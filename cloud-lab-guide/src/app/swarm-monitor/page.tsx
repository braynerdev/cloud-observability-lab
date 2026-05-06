import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { Activity, AlertTriangle } from "lucide-react";

export default function SwarmMonitorPage() {
  return (
    <div>
      <PageHeader
        step="Passo 04"
        title="Swarm Monitor no Portainer"
        description="O Portainer já possui a stack Swarm monitoring pronta, com Prometheus & Grafana. Basta adicionar a label obrigatória nos nós e fazer o deploy."
        icon={<Activity className="h-6 w-6" />}
      />

      <StepCard
        step={1}
        title="Adicionar a label obrigatória nos nós"
        badge={
          <span className="inline-flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Obrigatório
          </span>
        }
        description={
          <div className="space-y-2 text-sm">
            <p>
              Antes do deploy, é <strong>obrigatório</strong> adicionar a label{" "}
              <code className="bg-muted px-1 rounded text-xs">swarm.monitoring=true</code> em cada nó do Swarm pelo Portainer.
              Sem ela, o Prometheus não consegue coletar métricas dos nós.
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>No menu lateral do Portainer, clique em <strong>Swarm</strong></li>
              <li>Clique no nó que deseja monitorar</li>
              <li>Role até a seção <strong>Node Labels</strong></li>
              <li>Clique em <strong>Add label</strong></li>
              <li>No campo <strong>Name</strong> digite: <code className="bg-muted px-1 rounded text-xs">swarm.monitoring</code></li>
              <li>No campo <strong>Value</strong> digite: <code className="bg-muted px-1 rounded text-xs">true</code></li>
              <li>Clique em <strong>Apply changes</strong></li>
              <li>Repita para todos os nós do cluster</li>
            </ol>
          </div>
        }
      />

      <StepCard
        step={2}
        title='Usar o template "Swarm monitoring" no Portainer'
        badge="Portainer UI"
        description={
          <ol className="space-y-1.5 list-decimal list-inside text-sm">
            <li>Acesse o Portainer em <code className="bg-muted px-1 rounded text-xs">http://IP_DO_SERVIDOR:9000</code></li>
            <li>No menu lateral, clique em <strong>Stacks</strong></li>
            <li>Clique em <strong>+ Add Stack</strong></li>
            <li>Em <strong>Build method</strong>, selecione <strong>Template</strong></li>
            <li>Localize o template <strong>Swarm monitoring</strong> — <em>Monitor your cluster performances with Prometheus &amp; Grafana</em></li>
            <li>Clique em <strong>Deploy the stack</strong></li>
            <li>Aguarde até que todos os serviços apareçam como <strong>Running</strong></li>
          </ol>
        }
      />

      <StepCard
        step={3}
        title="Acessar o Grafana"
        badge="Acesso"
        description={
          <div className="space-y-2 text-sm">
            <p>Após o deploy, acesse o Grafana no navegador. A porta padrão do template é <code className="bg-muted px-1 rounded text-xs">3000</code>:</p>
            <p>Credenciais padrão: usuário <code className="bg-muted px-1 rounded text-xs">admin</code> / senha <code className="bg-muted px-1 rounded text-xs">admin</code>. Troque a senha no primeiro acesso.</p>
          </div>
        }
        code="http://IP_DO_SERVIDOR:3000"
        language="text"
      />
    </div>
  );
}
