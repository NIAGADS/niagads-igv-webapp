import { VariantConsequence } from "./annotations"

export interface VCFInfo {
    location: string;
    position: number;
    chromosome: string;
    display_id: string;
    metaseq_id: string;
    ref_snp_id: string;
    variant_class: string;
    display_allele: string;
    is_adsp_variant: boolean;
    variant_class_abbrev: string;
    most_severe_consequence?: VariantConsequence;
}
