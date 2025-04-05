package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.PromptRepository;
import com.psognathus.code.prompt_service.prompt.PromptData;
import com.psognathus.code.prompt_service.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PromptService {
    @Autowired
    private PromptRepository promptRepository;

    public Prompt createPrompt(PromptData data) {
        Prompt prompt = new Prompt(data.getAssistantId(), data.getName(), data.getPrompt());

        return promptRepository.save(prompt);
    }

    public Prompt deletePrompt(Long id) {
        Prompt prompt = promptRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No prompt found with ID " + id));
        promptRepository.delete(prompt);
        return prompt;
    }

    public void deleteAssistantPrompts(Long assistantId) {
        List<Prompt> assistantPrompts = promptRepository.findByAssistantId(assistantId);
        for (Prompt prompt: assistantPrompts) {
            promptRepository.delete(prompt);
        }
    }

    @Transactional
    public Prompt updatePrompt(PromptData data) {
        this.deleteAssistantPrompts(data.getAssistantId());
        return this.createPrompt(data);
    }
}