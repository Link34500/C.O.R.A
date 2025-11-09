import { Card } from "@/components/ui/card";
import { Form } from "@/components/Form";

export function LoginForm() {
  return (
    <Form endPoint="/api/login" method="POST">
      <Card>Hello</Card>
    </Form>
  );
}
