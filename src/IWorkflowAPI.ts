export interface IIComfyWorkflowAPI {
    [k:string]: IComfyWorkflowAPIItem
}
export interface IComfyWorkflowAPIItem {
    inputs:     Inputs;
    class_type: string;
    _meta:      Meta;
}

export interface Meta {
    title: string;
}

export interface Inputs {
    image?:                   Array<number | string> | string;
    upload?:                  string;
    width?:                   Array<number | string>;
    height?:                  Array<number | string>;
    upscale_factor?:          number;
    images?:                  Array<number | string>;
    invert_mask?:             boolean;
    blend_mode?:              string;
    opacity?:                 number;
    x_percent?:               Array<number | string>;
    y_percent?:               Array<number | string>;
    mirror?:                  string;
    scale?:                   Array<number | string>;
    aspect_ratio?:            number | string;
    rotate?:                  number;
    transform_method?:        string;
    anti_aliasing?:           number;
    background_image?:        Array<number | string>;
    layer_image?:             Array<number | string>;
    red?:                     number;
    green?:                   number;
    blue?:                    number;
    number?:                  number;
    min_value?:               number;
    max_value?:               number;
    step?:                    number;
    ckpt_name?:               string;
    model_path?:              string;
    model?:                   Array<number | string> | string;
    multiplier?:              number;
    positive?:                Array<number | string>;
    negative?:                Array<number | string>;
    vae?:                     Array<number | string>;
    foreground?:              Array<number | string>;
    text?:                    Array<number | string> | string;
    clip?:                    Array<number | string>;
    pixels?:                  Array<number | string>;
    seed?:                    number;
    steps?:                   number;
    cfg?:                     number;
    sampler_name?:            string;
    scheduler?:               string;
    denoise?:                 number;
    latent_image?:            Array<number | string>;
    samples?:                 Array<number | string>;
    mode?:                    string;
    blend_image?:             Array<number | string>;
    base_image?:              Array<number | string>;
    strength?:                number;
    brightness?:              number;
    contrast?:                number;
    saturation?:              number;
    blur_sigma?:              number;
    blend_factor?:            number;
    target?:                  Array<number | string>;
    source?:                  Array<number | string>;
    mask?:                    Array<number | string>;
    blur_type?:               string;
    blur_size?:               number;
    factor?:                  number;
    detail?:                  Array<number | string>;
    blend_percentage?:        number;
    image_a?:                 Array<number | string>;
    image_b?:                 Array<number | string>;
    grow?:                    number;
    blur?:                    number;
    rgthree_comparer?:        RgthreeComparer;
    Input?:                   number;
    image1?:                  Array<number | string>;
    image2?:                  Array<number | string>;
    vae_name?:                string;
    x?:                       number;
    y?:                       number;
    resize_source?:           boolean;
    destination?:             Array<number | string>;
    channel?:                 string;
    low_threshold?:           number;
    high_threshold?:          number;
    resolution?:              number;
    unet_name?:               string;
    weight_dtype?:            string;
    clip_name1?:              string;
    clip_name2?:              string;
    type?:                    string;
    control_net_name?:        string;
    start_percent?:           number;
    end_percent?:             number;
    control_net?:             Array<number | string>;
    noise_seed?:              number;
    timestep_to_start_cfg?:   number;
    true_gs?:                 number;
    image_to_image_strength?: number;
    denoise_strength?:        number;
    conditioning?:            Array<number | string>;
    neg_conditioning?:        Array<number | string>;
    controlnet_condition?:    Array<number | string>;
    controlnet?:              Array<number | string>;
    model_name?:              string;
    controlnet_path?:         string;
    batch_size?:              number;
    clip_l?:                  Array<number | string> | string;
    t5xxl?:                   Array<number | string> | string;
    guidance?:                number;
    exposure?:                number;
    masks_a?:                 Array<number | string>;
    masks_b?:                 Array<number | string>;
    threshold?:               number;
    torchscript_jit?:         string;
    select?:                  number;
    sel_mode?:                boolean;
    input1?:                  Array<number | string>;
    input2?:                  Array<number | string>;
    mask_threshold?:          number;
    gaussblur_radius?:        number;
    masks?:                   Array<number | string>;
    scale_option?:            string;
    average_color?:           string;
    fill_color?:              string;
    interpolation?:           string;
    method?:                  string;
    condition?:               string;
    multiple_of?:             number;
    delimiter?:               string;
    clean_whitespace?:        string;
    text_a?:                  Array<number | string>;
    text_b?:                  Array<number | string>;
    anything?:                Array<number | string>;
    size?:                    number;
    interpolation_mode?:      string;
    prompt?:                  Array<number | string>;
    max_tokens?:              number;
    keep_model_loaded?:       boolean;
    temperature?:             number;
    llava_model?:             Array<number | string>;
    device?:                  string;
    precision?:               string;
    attention?:               string;
    text2?:                   string;
    preprocessor?:            string;
    old?:                     string;
    new?:                     string;
    lora_name?:               string;
    strength_model?:          number;
    strength_clip?:           number;
}

export interface RgthreeComparer {
    images: Image[];
}

export interface Image {
    name:     string;
    selected: boolean;
    url:      string;
}
