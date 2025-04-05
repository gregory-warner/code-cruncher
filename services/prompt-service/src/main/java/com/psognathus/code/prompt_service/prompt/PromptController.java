package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.PromptService;
import com.psognathus.code.prompt_service.prompt.PromptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/prompt")
public class PromptController {
    @Autowired
    private PromptService promptService;

    @GetMapping("/")
    public PromptResponse home() {
        return new PromptResponse(200, "Hello!");
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