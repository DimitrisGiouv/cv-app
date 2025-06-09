export const templates = {
    Empty: "Empty Template",
    Template_1 : "Template 1"
  };
  
  export function getTemplateClass(templateKey) {
    switch (templateKey) {
      case "clean":
      default:
        return "clean-template";
    }
  }