package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/prompt")
public class PromptController {
    @Autowired
    private PromptService promptService;

    @PostMapping
    public Prompt createPrompt(@Valid @RequestBody PromptData data) {
        return promptService.createPrompt(data);
    }

    @DeleteMapping("/{id}")
    public Prompt deletePrompt(@PathVariable Integer id) {
        return promptService.deletePrompt(id);
    }
}