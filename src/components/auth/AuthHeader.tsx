import logo from "@/assets/logo_Thermodmr.png";

export const AuthHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mb-2">
      <img src={logo} alt="ThermoDMR" className="h-20 object-contain" />
      <p className="text-sm text-muted-foreground text-center">
        Finestre di Design Moderno, Resistenti nel tempo
      </p>
    </div>
  );
};
