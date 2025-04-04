package com.psognathus.code.prompt_service.prompt;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "prompt")
@SQLDelete(sql = "UPDATE prompt SET is_deleted = true where id = ?")
@Where(clause = "is_deleted = false")
public class Prompt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promptId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private Long assistantId;
    private String promptName;
    private String prompt;
    private boolean isDeleted = false;

    public Prompt() {
    }

    public Prompt(Long promptId, Long assistantId, String promptName, String prompt, boolean isDeleted) {
        this.promptId = promptId;
        this.assistantId = assistantId;
        this.promptName = promptName;
        this.prompt = prompt;
        this.isDeleted = isDeleted;
    }

    public Long getPromptId() {
        return promptId;
    }

    public void setPromptId(Long promptId) {
        this.promptId = promptId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
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

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}