package com.psognathus.code.prompt_service.prompt;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public class PromptData {
    @NotNull(message = "Assistant ID is required")
    @Min(1)
    private Long assistantId;

    private String name = "";

    private String prompt = "";

    public PromptData(Long assistantId, String promptName, String prompt) {
        this.assistantId = assistantId;
        this.name = promptName;
        this.prompt = prompt;
    }

    public Long getAssistantId() {
        return assistantId;
    }

    public void setAssistantId(Long assistantId) {
        this.assistantId = assistantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}