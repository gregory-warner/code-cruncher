package com.psognathus.code.prompt_service.prompt;

import jakarta.validation.constraints.NotEmpty;

public class PromptData {
    private Long assistantId;
    @NotEmpty(message = "Prompt name cannot be empty")
    private String promptName;
    private String prompt;

    public PromptData(Long assistantId, String promptName, String prompt) {
        this.assistantId = assistantId;
        this.promptName = promptName;
        this.prompt = prompt;
    }

    public Long getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(Long assistantId) {
        this.assistantId = assistantId;
    }

    public String getPromptName() {
        return promptName;
    }

    public void setPromptName(String promptName) {
        this.promptName = promptName;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}