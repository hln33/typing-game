export const enum ProgrammingLanguage {
  Python = "python",
  JavaScript = "javascript",
  Ruby = "ruby",
}

export const ProgrammingLanguageLabels = {
  [ProgrammingLanguage.Python]: "Python",
  [ProgrammingLanguage.JavaScript]: "JavaScript",
  [ProgrammingLanguage.Ruby]: "Ruby",
} as const;
