const useColorToTailwind = () => {
    return (color: string) => {
      switch (color) {
        case "purple":
          return "z-purple";
        case "red":
          return "z-red";
        case "green":
          return "z-green";
        default:
          return undefined;
      }
    };
  };
  
  export default useColorToTailwind;
  