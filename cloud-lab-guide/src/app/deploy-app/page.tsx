import { PageHeader } from "@/components/page-header";
import { StepCard } from "@/components/step-card";
import { GitBranch } from "lucide-react";

export default function DeployAppPage() {
  return (
    <div>
      <PageHeader
        step="Passo 05"
        title="Deploy de Aplicação do GitHub"
        description="Descrição da página aqui."
        icon={<GitBranch className="h-6 w-6" />}
      />

      <StepCard
        step={1}
        title="Título do passo 1"
        badge="Badge"
        description="Descrição do passo 1."
        code={`comando de exemplo`}
        language="bash"
      />

      <StepCard
        step={2}
        title="Título do passo 2"
        badge="Badge"
        description="Descrição do passo 2."
        code={`outro comando`}
        language="bash"
      />
    </div>
  );
}
