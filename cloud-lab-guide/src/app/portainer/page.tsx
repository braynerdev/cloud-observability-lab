import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { CodeBlock } from "@/components/code-block";
import { Container } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PORTAINER_YAML = `version: "3.8"
services:
  agent:
    image: portainer/agent:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/volumes:/var/lib/docker/volumes
    networks:
      - portainer_network
    deploy:
      mode: global
      placement:
        constraints: [ node.platform.os == linux ]

  portainer:
    image: portainer/portainer-ce:latest
    command: -H tcp://tasks.agent:9001 --tlsskipverify
    ports:
      - 9000:9000
    volumes:
      - portainer_data:/data
    networks:
      - portainer_network
    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints: [ node.role == manager ]

networks:
  portainer_network:
    external: true

volumes:
  portainer_data:
    external: true`;

export default function PortainerPage() {
  return (
    <div>
      <PageHeader
        step="Passo 03"
        title="Subindo o Portainer"
        description="Conecte ao servidor EC2 via SSH usando o arquivo .ppk da AWS e instale o Docker + Portainer com Docker Swarm."
        icon={<Container className="h-6 w-6" />}
      />

      <StepCard
        step={2}
        title="Conectar ao servidor via SSH (MobaXterm)"
        badge="SSH"
        description={
          <div className="space-y-3 text-sm">
            <p>Baixe e instale o <strong>MobaXterm</strong> para conectar ao servidor usando o arquivo <code className="bg-muted px-1 rounded text-xs">.ppk</code> gerado pela AWS:</p>
            <p>
              <a href="https://mobaxterm.mobatek.net/download.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                https://mobaxterm.mobatek.net/download.html
              </a>
            </p>
            <p>Após instalar, crie uma nova sessão SSH:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Clique em <strong>Session</strong> → <strong>SSH</strong></li>
              <li><strong>Remote host:</strong> IP público da instância EC2 (output do Terraform)</li>
              <li><strong>Username:</strong> ubuntu</li>
              <li>Marque <strong>Use private key</strong> e selecione o arquivo <code className="bg-muted px-1 rounded text-xs">.ppk</code> baixado da AWS</li>
              <li>Clique em <strong>OK</strong> para conectar</li>
            </ul>
          </div>
        }
      />

      <StepCard
        step={3}
        title="Atualizar o sistema"
        badge="Linux"
        description="Com o terminal aberto, atualize os pacotes do sistema antes de instalar qualquer coisa:"
        code={`sudo apt update
sudo apt upgrade -y`}
        language="bash"
      />

      <StepCard
        step={4}
        title="Instalar o Docker de forma automática"
        badge="Docker"
        description="Use o script oficial do Docker para instalar automaticamente:"
        code={`curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh`}
        language="bash"
      />

      <StepCard
        step={5}
        title="Inicializar o Docker Swarm"
        badge="Docker Swarm"
        description={
          <p className="text-sm">
            Inicialize o Swarm substituindo <code className="bg-muted px-1 rounded text-xs">IP_DO_SERVIDOR</code> pelo IP público da instância EC2:
          </p>
        }
        code="docker swarm init --advertise-addr=IP_DO_SERVIDOR"
        language="bash"
      />

      <StepCard
        step={6}
        title="Criar a rede para o Portainer"
        badge="Docker Network"
        description="Crie a rede overlay que será usada pelo agente e pelo Portainer:"
        code="docker network create --driver=overlay portainer_network"
        language="bash"
      />

      <StepCard
        step={7}
        title="Criar o diretório e o arquivo de stack"
        badge="Arquivo"
        description="Crie a pasta do Portainer e abra o editor para colar o conteúdo do arquivo YAML:"
        code={`mkdir portainer
cd portainer/
nano portainer.yaml`}
        language="bash"
      />

      <StepCard
        step={8}
        title="Colar a stack do Portainer"
        badge="YAML"
        description={
          <p className="text-sm">
            Cole o conteúdo abaixo no editor <code className="bg-muted px-1 rounded text-xs">nano</code>. Após colar, salve com <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs">Ctrl+X</kbd> → <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs">Y</kbd> → <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs">Enter</kbd>
          </p>
        }
        code={PORTAINER_YAML}
        language="yaml"
      />

      <StepCard
        step={9}
        title="Fazer o deploy da stack"
        badge="Deploy"
        description="Execute o comando abaixo para subir o Portainer via Docker Swarm:"
        code="docker stack deploy -c portainer.yaml portainer"
        language="bash"
      />

      <StepCard
        step={10}
        title="Acessar o Portainer no navegador"
        badge="Acesso"
        description={
          <div className="space-y-2 text-sm">
            <p>Abra o navegador e acesse o IP da instância seguido de <code className="bg-muted px-1 rounded text-xs">:9000</code>:</p>
            <p>Na primeira vez, crie um <strong>usuário administrador</strong> com nome e senha forte para finalizar a configuração.</p>
          </div>
        }
        code="http://IP_DO_SERVIDOR:9000"
        language="text"
      />
    </div>
  );
}
