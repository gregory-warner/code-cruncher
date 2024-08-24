export interface ModelResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    done_reason: string;
}

export type OllamaKeepAlive = 0|1|-1;

interface ModelDetails {
    parent_model: string;
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
}

export interface ModelResponse {
    models: Model[],
}

export interface Model {
    name: string;
    model: string;
    modified_at: string;
    size: number;
    digest: string;
    details: ModelDetails;
}

type ImageData = ArrayBuffer | Uint8Array;

interface ToolCallFunction {
    name: string;
    arguments: ToolCallFunctionArguments;
}

interface ToolCallFunctionArguments {
    [key: string]: any;
}

interface ToolCall {
    function: ToolCallFunction
}

interface Tool {
    type: string;
    function: ToolFunction;
}

interface ToolFunction {
    name: string;
    description: string;
    parameters: {
        type: string;
        required: string[];
        properties: {
            [key: string]: {
                type: string;
                description: string;
                enum?: string[];
            }
        };
    };
}

export interface OllamaMessage {
    role: string;
    content: string;
    images?: ImageData[];
    tool_calls?: ToolCall[];
}

export interface OllamaRequest {
    model: string;
    messages: OllamaMessage[];
    stream: boolean;
    format?: string;
    keep_alive?: OllamaKeepAlive;
    tools?: Tool[];
    options?: Options;
}

interface Options {
    runner?: Runner;

    num_keep?: number;
    seed?: number;
    num_predict?: number;
    top_k?: number;
    top_p?: number;
    min_p?: number;
    tfs_z?: number;
    typical_p?: number;
    repeat_last_n?: number;
    temperature?: number;
    repeat_penalty?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    mirostat?: number;
    mirostat_tau?: number;
    mirostat_eta?: number;
    penalize_newline?: boolean;
    stop?: string[];
}

interface Runner {
    numa?: boolean;
    num_ctx?: number;
    num_batch?: number;
    num_gpu?: number;
    main_gpu?: number;
    low_vram?: boolean;
    f16_kv?: boolean;
    logits_all?: boolean;
    vocab_only?: boolean;
    use_mmap?: boolean | null;
    use_mlock?: boolean;
    num_thread?: number;
}

export interface OllamaResponse {
    model: string;
    created_at: Date;
    message: OllamaMessage;
    done_reason?: string;
    done: boolean;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}