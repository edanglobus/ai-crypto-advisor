interface AlertProps {
  message: string;
}

export function Alert({ message }: AlertProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
    >
      {message}
    </div>
  );
}
