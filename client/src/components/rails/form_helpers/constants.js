export const DEFAULT_HTML_OPTIONS = { class: "", id: "" };
export const DEFAULT_URL_OPTIONS = { method: "", action: "", controller: "" };

export const FORM_HTML_OPTIONS = { ...DEFAULT_HTML_OPTIONS };
export const SELECT_DROPDOWN_HTML_OPTIONS = {
  ...DEFAULT_HTML_OPTIONS,
  multiple: true,
  size: "",
  include_blank: "",
  prompt: "",
};

export const DEFAULT_HTML_OPTION_FILEDS = [
  { name: "id", label: "Id", type: "TextFieldWithLabel" },
  { name: "class", label: "Class", type: "TextFieldWithLabel" },
];

export const FORM_HTML_OPTION_FILEDS = [...DEFAULT_HTML_OPTION_FILEDS];

export const SELECT_DROPDOWN_HTML_OPTION_FILEDS = [
  ...DEFAULT_HTML_OPTION_FILEDS,
  { name: "size", label: "Size", type: "TextFieldWithLabel" },
  { name: "include_blank", label: "Include Blank", type: "TextFieldWithLabel" },
  { name: "prompt", label: "Prompt", type: "TextFieldWithLabel" },
  { name: "multiple", label: "Multiple", type: "Toggle" },
  { name: "disabled", label: "Disabled", type: "Toggle" },
  // :include_blank - If set to true, an empty option will be created. If set to a string, the string will be used as the option’s content and the value will be empty.
  // :prompt - Create a prompt option with blank value and the text asking user to select something.
];

export const URL_OPTION_FILEDS = [
  { name: "method", label: "Method", type: "TextFieldWithLabel" },
  { name: "controller", label: "Controller", type: "TextFieldWithLabel" },
  { name: "action", label: "Action", type: "TextFieldWithLabel" },
];
