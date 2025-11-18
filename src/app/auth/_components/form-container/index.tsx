export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center items-start pt-10">
      {children}
    </div>
  );
};
