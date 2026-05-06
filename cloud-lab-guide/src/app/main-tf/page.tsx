import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { CodeBlock } from "@/components/code-block";
import { FileCode2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FULL_MAIN_TF = `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "ssh_access" {
  name        = "ssh-access"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3004
    to_port     = 3004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                         = "ami-091138d0f0d41ff90"
  instance_type               = "t3.small"
  vpc_security_group_ids      = [aws_security_group.ssh_access.id]
  associate_public_ip_address = true
  key_name                    = "cloud-observability-lab"

  tags = {
    Name = "cloud-observability-lab"
  }
}

output "public_ip" {
  value = aws_instance.web.public_ip
}`;

export default function MainTfPage() {
  return (
    <div>
      <PageHeader
        step="Passo 02"
        title="Entendendo o main.tf"
        description="Análise completa do arquivo de infraestrutura Terraform. Cada bloco é explicado linha a linha, seguido do arquivo completo para copiar."
        icon={<FileCode2 className="h-6 w-6" />}
      />

      <StepCard
        step={1}
        title='Bloco terraform — Declaração do provider'
        badge="terraform {}"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li><code className="bg-muted px-1 rounded text-xs">required_providers</code> — lista os plugins que o Terraform precisa baixar</li>
            <li><code className="bg-muted px-1 rounded text-xs">source = "hashicorp/aws"</code> — baixa o provider AWS do registry oficial da HashiCorp</li>
            <li><code className="bg-muted px-1 rounded text-xs">version = "~{">"} 5.0"</code> — aceita qualquer versão 5.x (5.1, 5.9…) mas nunca a 6.0</li>
          </ul>
        }
        code={`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}`}
        language="hcl"
      />

      <StepCard
        step={2}
        title='Bloco provider — Região da AWS'
        badge="provider {}"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li><code className="bg-muted px-1 rounded text-xs">provider "aws"</code> — configura o provider AWS declarado acima</li>
            <li><code className="bg-muted px-1 rounded text-xs">region = "us-east-1"</code> — todos os recursos serão criados na região Leste dos EUA (Virgínia do Norte), geralmente a mais barata e com maior disponibilidade de serviços</li>
          </ul>
        }
        code={`provider "aws" {
  region = "us-east-1"
}`}
        language="hcl"
      />

      <StepCard
        step={3}
        title='Recurso aws_security_group — Firewall da instância'
        badge="Security Group"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li><code className="bg-muted px-1 rounded text-xs">resource "aws_security_group" "ssh_access"</code> — cria um Security Group (firewall virtual) com o identificador local <code className="bg-muted px-1 rounded text-xs">ssh_access</code></li>
            <li><code className="bg-muted px-1 rounded text-xs">name = "ssh-access"</code> — nome que aparece no console AWS</li>
            <li><code className="bg-muted px-1 rounded text-xs">ingress porta 22</code> — libera entrada SSH de qualquer IP (<code className="bg-muted px-1 rounded text-xs">0.0.0.0/0</code>)</li>
            <li><code className="bg-muted px-1 rounded text-xs">ingress porta 9000</code> — libera acesso ao Portainer</li>
            <li><code className="bg-muted px-1 rounded text-xs">ingress porta 3000</code> — libera acesso à aplicação (ex: Swarm Monitor)</li>
            <li><code className="bg-muted px-1 rounded text-xs">ingress porta 3004</code> — libera acesso a uma segunda aplicação publicada nessa porta</li>
            <li><code className="bg-muted px-1 rounded text-xs">egress protocol = "-1"</code> — permite <strong>todo</strong> tráfego de saída (sem restrições)</li>
            <li><code className="bg-muted px-1 rounded text-xs">cidr_blocks = ["0.0.0.0/0"]</code> — aceita tráfego de qualquer endereço IP do mundo</li>
          </ul>
        }
        code={`resource "aws_security_group" "ssh_access" {
  name        = "ssh-access"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3004
    to_port     = 3004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}
        language="hcl"
      />

      <StepCard
        step={4}
        title='Recurso aws_instance — A máquina EC2'
        badge="EC2 Instance"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li><code className="bg-muted px-1 rounded text-xs">resource "aws_instance" "web"</code> — cria uma instância EC2 com identificador local <code className="bg-muted px-1 rounded text-xs">web</code></li>
            <li><code className="bg-muted px-1 rounded text-xs">ami = "ami-091138d0f0d41ff90"</code> — imagem Amazon Linux 2 disponível em us-east-1 (sistema operacional)</li>
            <li><code className="bg-muted px-1 rounded text-xs">instance_type = "t3.small"</code> — 2 vCPUs e 2 GB de RAM, suficiente para rodar Portainer + stack de monitoramento (não coberto pelo Free Tier)</li>
            <li><code className="bg-muted px-1 rounded text-xs">vpc_security_group_ids</code> — vincula o Security Group criado no passo anterior</li>
            <li><code className="bg-muted px-1 rounded text-xs">associate_public_ip_address = true</code> — garante que a instância receba um IP público acessível pela internet</li>
            <li><code className="bg-muted px-1 rounded text-xs">key_name = "cloud-observability-lab"</code> — nome do par de chaves SSH criado na AWS para acesso remoto à instância</li>
            <li><code className="bg-muted px-1 rounded text-xs">tags</code> — metadados para identificar e filtrar o recurso no console AWS</li>
          </ul>
        }
        code={`resource "aws_instance" "web" {
  ami                         = "ami-091138d0f0d41ff90"
  instance_type               = "t3.small"
  vpc_security_group_ids      = [aws_security_group.ssh_access.id]
  associate_public_ip_address = true
  key_name                    = "cloud-observability-lab"

  tags = {
    Name = "cloud-observability-lab"
  }
}`}
        language="hcl"
      />

      <StepCard
        step={5}
        title='Bloco output — IP público da instância'
        badge="output {}"
        description={
          <ul className="space-y-1.5 list-disc list-inside text-sm">
            <li><code className="bg-muted px-1 rounded text-xs">output "public_ip"</code> — após o apply, exibe o IP público no terminal</li>
            <li><code className="bg-muted px-1 rounded text-xs">value = aws_instance.web.public_ip</code> — referencia o atributo <code className="bg-muted px-1 rounded text-xs">public_ip</code> gerado automaticamente pela AWS ao criar a instância</li>
            <li>Use este IP para acessar o servidor via SSH e para abrir o Portainer no navegador</li>
          </ul>
        }
        code={`output "public_ip" {
  value = aws_instance.web.public_ip
}`}
        language="hcl"
      />

      <Separator className="my-8" />

      <section>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-mono">02.B</span>
          Arquivo completo — main.tf
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Salve o conteúdo abaixo como <code className="bg-muted px-1 rounded text-xs">main.tf</code> dentro da pasta <code className="bg-muted px-1 rounded text-xs">Infra/</code> do seu projeto.
        </p>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-mono text-muted-foreground">Infra/main.tf</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock code={FULL_MAIN_TF} language="hcl" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
