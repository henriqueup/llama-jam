export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="text-red-500 text-sm">
      {message.split("\n").map((line, i) => (
        <p key={`form-error-line-${i}`}>{line}</p>
      ))}
    </div>
  );
}

export function FieldErrors({
  errors,
  fieldName,
}: {
  errors: Array<string | undefined>;
  fieldName: string;
}) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div role="alert" className="text-red-500 text-sm">
      {errors.map((error, i) => (
        <p key={`${fieldName}-${i}`}>{error}</p>
      ))}
    </div>
  );
}
