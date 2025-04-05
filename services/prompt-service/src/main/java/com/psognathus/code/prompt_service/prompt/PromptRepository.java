package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.Prompt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PromptRepository extends JpaRepository<Prompt, Long> {

    List<Prompt> findByAssistantId(Long assistantId);
}