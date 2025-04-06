package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.PromptService;
import com.psognathus.code.prompt_service.prompt.PromptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/prompt")
public class PromptController {
    @Autowired
    private PromptService promptService;

    @GetMapping("/")
    public PromptResponse home() {
        return new PromptResponse(200, "Hello! Welcome to the Prompt service.");
    }

    @GetMapping("/get-all/{assistantId}")
    public List<Prompt> getAllByAssistantId(@PathVariable Long assistantId) {
        return promptService.getAllPrompts(assistantId);
    }

    @PostMapping("/")
    public Prompt createPrompt(@Valid @RequestBody PromptData data) {
        return promptService.createPrompt(data);
    }

    @PostMapping("/update")
    public Prompt updatePrompt(@Valid @RequestBody PromptData data) {
        return promptService.updatePrompt(data);
    }

    @DeleteMapping("/{id}")
    public Prompt deletePrompt(@PathVariable Long id) {
        return promptService.deletePrompt(id);
    }
}