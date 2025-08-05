export const templates = {
    Empty: "Empty Template",
    Template_1 : "Template 1"
  };
  
  export function getTemplateClass(templateKey) {
    switch (templateKey) {
      case "Template_1":
        return "clean-template"; // or replace with another class if needed
      default:
        return "clean-template";
    }
  }