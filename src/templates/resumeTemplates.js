export const templates = {
  Empty: "Blank",
  Template_1 : "Professional Blue",
  Template_2 : "Executive Split",
  Template_3 : "Editorial Clean",
  Template_4 : "Modern Cards"
  };
  
  export function getTemplateClass(templateKey) {
    switch (templateKey) {
      case "Template_1":
        return "clean-template"; // or replace with another class if needed
      case "Template_2":
        return "clean-template";
      case "Template_3":
        return "clean-template";
      case "Template_4":
        return "clean-template";
      default:
        return "clean-template";
    }
  }