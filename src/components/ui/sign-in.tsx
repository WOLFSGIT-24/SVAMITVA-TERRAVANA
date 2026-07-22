import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SignInProps {
  title?: string;
  message?: string;
  className?: string;
  cardClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
}

export function SignIn({
  title = "Access Required",
  message = "Please contact us to access this content.",
  className = "min-h-screen flex items-center justify-center px-4",
  cardClassName = "w-fit max-w-xl mx-auto text-foreground",
  buttonClassName = "w-full h-10 max-w-sm mx-auto",
  buttonText = "Contact Us",
}: SignInProps) {
  return (
    <div className={className}>
      <Card className={cardClassName}>
        <CardHeader className="text-center space-y-4 py-10 px-10">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center px-10 pb-10">
          <Button
            onClick={() => { window.location.href = '#contact'; }}
            className={buttonClassName}
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
