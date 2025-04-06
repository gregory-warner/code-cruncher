package com.psognathus.code.prompt_service.prompt;

import com.psognathus.code.prompt_service.prompt.Prompt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PromptRepository extends JpaRepository<Prompt, Long> {

    List<Prompt> findByAssistantId(Long assistantId);

    @Query("SELECT p from Prompt p where p.assistantId = :assistantId")
    List<Prompt> findAllByAssistantId(@Param("assistantId") Long assistantId);
}