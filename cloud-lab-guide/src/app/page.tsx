import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { Terminal } from "lucide-react";

export default function TerraformPage() {
  return (
    <div>
      <PageHeader
        step="Passo 01"
        title="Terraform & AWS CLI"
        description="Instalar e configurar o TERRAFORM e o AWS CLI"
        icon={<Terminal className="h-6 w-6" />}
      />

      <StepCard
        step={1}
        title="Instalar o terraform"
        badge="Badge"
        description="Entrar no site do terraform e baixar o instalador para o seu sistema operacional."
        code="https://developer.hashicorp.com/terraform/install"
        language="url"
      />

      <StepCard
        step={2}
        title="Extrair o arquivo"
        badge="Badge"
        description="Extrair o arquivo baixado para uma pasta de sua preferência."
        code=""
        language="folder"
      />

      <StepCard
        step={3}
        title="Adicionar ao PATH"
        badge="Badge"
        description="Adicionar o caminho do arquivo extraído ao PATH do seu sistema."
        code=""
        language="folder"
      />
      
      <StepCard
        step={4}
        title="Criar um usuário IAM"
        badge="Badge"
        description="Criar um usuário IAM com as permissão de AdministratorAccess."
        code=""
        language=""
      />

      <StepCard
        step={5}
        title="Baixar o AWS CLI"
        badge="Badge"
        description="Baixar o AWS CLI para o seu sistema operacional."
        code="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-version.html"
        language="url"
      />

      <StepCard
        step={6}
        title="Configurar o AWS CLI"
        badge="Badge"
        description="Configurar o AWS CLI com as credenciais do usuário IAM. Chave de acesso e chave secreta e região."
        code="aws configure --profile <nome do perfil>"
        language="bash"
      />

      <StepCard
        step={7}
        title="Verificar a configuração"
        badge="Badge"
        description="Verificar se a configuração foi feita corretamente."
        code="aws configure list --profile <nome do perfil>"
        language="bash"
      />
    </div>
  );
}
