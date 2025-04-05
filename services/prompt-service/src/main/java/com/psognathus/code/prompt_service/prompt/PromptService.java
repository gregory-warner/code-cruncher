package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.PromptRepository;
import com.psognathus.code.prompt_service.prompt.PromptData;
import com.psognathus.code.prompt_service.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

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
}