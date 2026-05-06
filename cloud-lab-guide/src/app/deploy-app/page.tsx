import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { GitBranch } from "lucide-react";

export default function DeployAppPage() {
  return (
    <div>
      <PageHeader
        step="Passo 05"
        title="Deploy de Aplicação do GitHub"
        description="Faça o deploy de uma stack Docker direto de um repositório público do GitHub usando o Portainer. O Portainer lê o docker-compose.yml do repositório e sobe a stack no Swarm automaticamente."
        icon={<GitBranch className="h-6 w-6" />}
      />

      <StepCard
        step={1}
        title="Pré-requisitos no repositório do GitHub"
        badge="GitHub"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li>O repositório precisa ser <strong>público</strong> (sem autenticação)</li>
            <li>Deve conter um arquivo <code className="bg-muted px-1 rounded text-xs">docker-compose.yml</code> válido na raiz (ou em um caminho conhecido)</li>
            <li>O <code className="bg-muted px-1 rounded text-xs">docker-compose.yml</code> deve usar imagens públicas (Docker Hub, GHCR público etc.) ou imagens já disponíveis no servidor</li>
            <li>Anote a <strong>URL HTTPS</strong> do repositório, ex: <code className="bg-muted px-1 rounded text-xs">https://github.com/usuario/projeto</code></li>
          </ul>
        }
      />

      <StepCard
        step={2}
        title="Acessar o Portainer e iniciar uma nova stack"
        badge="Portainer UI"
        description={
          <ol className="space-y-1.5 list-decimal list-inside text-sm">
            <li>Abra o Portainer em <code className="bg-muted px-1 rounded text-xs">http://IP_DO_SERVIDOR:9000</code></li>
            <li>Selecione o ambiente <strong>cloud-observability-lab</strong> (ou o nome do seu Swarm)</li>
            <li>No menu lateral, clique em <strong>Stacks</strong></li>
            <li>Clique no botão <strong>+ Add Stack</strong></li>
          </ol>
        }
      />

      <StepCard
        step={3}
        title="Definir o nome da stack"
        badge="Name"
        description={
          <div className="space-y-2 text-sm">
            <p>No campo <strong>Name</strong>, digite um nome em minúsculas, sem espaços, usando apenas letras, números e hífens. Esse nome será usado como prefixo dos serviços no Swarm.</p>
            <p>Exemplo: <code className="bg-muted px-1 rounded text-xs">minha-app</code></p>
          </div>
        }
      />

      <StepCard
        step={4}
        title='Escolher o build method "Repository"'
        badge="Build method"
        description={
          <ol className="space-y-1.5 list-decimal list-inside text-sm">
            <li>Em <strong>Build method</strong>, selecione a opção <strong>Repository</strong></li>
            <li>Mantenha <strong>Authentication</strong> <em>desligado</em> (repositório público não exige login)</li>
            <li>Mantenha <strong>Skip TLS Verification</strong> <em>desligado</em></li>
          </ol>
        }
      />

      <StepCard
        step={5}
        title="Preencher a URL do repositório"
        badge="Repository URL"
        description={
          <div className="space-y-2 text-sm">
            <p>No campo <strong>Repository URL</strong>, cole a URL HTTPS do repositório público:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>Repository reference</strong>: deixe em branco para usar a branch padrão, ou informe <code className="bg-muted px-1 rounded text-xs">refs/heads/main</code> para uma branch específica</li>
              <li><strong>Compose path</strong>: caminho do arquivo dentro do repositório, normalmente <code className="bg-muted px-1 rounded text-xs">docker-compose.yml</code></li>
            </ul>
          </div>
        }
        code="https://github.com/usuario/projeto"
        language="text"
      />

      <StepCard
        step={6}
        title="Variáveis de ambiente (opcional)"
        badge="Environment"
        description={
          <div className="space-y-2 text-sm">
            <p>Se o seu <code className="bg-muted px-1 rounded text-xs">docker-compose.yml</code> usar variáveis (<code className="bg-muted px-1 rounded text-xs">${'${VAR}'}</code>), preencha-as na seção <strong>Environment variables</strong>:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Clique em <strong>+ Add an environment variable</strong></li>
              <li>Informe <strong>name</strong> e <strong>value</strong> de cada variável</li>
              <li>Ou clique em <strong>Load variables from .env file</strong> para importar de um arquivo</li>
            </ol>
            <p>Se a sua stack não usa variáveis, pule esta etapa.</p>
          </div>
        }
      />

      <StepCard
        step={7}
        title="Fazer o deploy da stack"
        badge="Deploy"
        description={
          <div className="space-y-2 text-sm">
            <p>Em <strong>Access control</strong>, mantenha <strong>Administrators</strong> selecionado.</p>
            <p>Role até o final da página e clique em <strong>Deploy the stack</strong>. O Portainer irá:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Clonar o repositório do GitHub no servidor</li>
              <li>Ler o <code className="bg-muted px-1 rounded text-xs">docker-compose.yml</code></li>
              <li>Fazer pull das imagens necessárias</li>
              <li>Subir os serviços no Swarm</li>
            </ol>
            <p>Aguarde até que todos os serviços apareçam como <strong>Running</strong> em <strong>Stacks {'>'} sua-stack {'>'} Services</strong>.</p>
          </div>
        }
      />

      <StepCard
        step={8}
        title="Atualizar a stack quando o repositório mudar"
        badge="Update"
        description={
          <ol className="space-y-1.5 list-decimal list-inside text-sm">
            <li>Acesse <strong>Stacks</strong> e clique na sua stack</li>
            <li>Clique em <strong>Pull and redeploy</strong></li>
            <li>O Portainer puxa a versão mais recente do repositório e re-aplica o compose</li>
            <li>Marque <strong>Re-pull image</strong> se quiser baixar de novo as imagens Docker</li>
          </ol>
        }
      />
    </div>
  );
}
