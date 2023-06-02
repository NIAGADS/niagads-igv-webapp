
export const config: {[key: string]: any}[] = [
     {
        "feature_type": "variant",
        "endpoint": "https://www.niagads.org/genomics/service/track/variant",
        "consortium": "ADSP",
        "name": "ADSK 17K R3 Variants",
        "label": "ADSK 17K",
        "track": "ADSP_17K",
        "track_type": "variant_service",
        "data_source": "NIAGADS",
        "track_type_display": "Variant Annotation",
        "displayMode": "EXPANDED",
        "type": "variant_service",
        "id": "ADSP_17K",
        "supportsWholeGenome": false,
        "visibilityWindow": 1000000,
        "removable": true,
        "reader": {
          "config": {
            "endpoint": "https://www.niagads.org/genomics/service/track/variant",
            "track": "ADSP_17K"
          },
          "endpoint": "https://www.niagads.org/genomics/service/track/variant",
          "indexed": false,
          "track": "ADSP_17K"
        },
        "queryable": true,
        "expandQuery": false,
        "sourceType": "custom",
        "metadata": {
          "Description": "Variants from the Alzheimer''s Disease Sequencing Project (ADSP) 17K R3 whole genome sequencing effort - INDELs and SNVs that passed the ADSP biallelic quality control (QC) criteria. Variants are annotated by the ADSP Annotation Pipeline."
        }
    },
    {
        "biosample_characteristics": {
          "gender": null,
          "anatomical_system": null,
          "diagnosis": "late onset Alzheimer's disease",
          "tissue": null,
          "biosample": null,
          "biomarker": null,
          "neuropathology": null,
          "APOE carrier status": null,
          "population": "European"
        },
        "consortium": "IGAP",
        "description": "summary statistics from meta-analysis results obtained in the stage 1 GWAS study, including genotyped and imputed data (11,480,632 variants, phase 1 integrated release 3, March 2012) of 21,982 Alzheimer's disease cases and 41,944 cognitively normal controls. The meta-analysis examined SNPs genotyped or imputed in at least 30% of the AD cases and 30% of the control samples across all datasets. (Lifted Over from GRCh37 to GRCh38)",
        "label": "IGAP Rare Variants: Stage 1 (GRCh38)",
        "repository": "NIAGADS (DSS)",
        "track_type": "gwas_service",
        "experimental_design": {
          "antibody_target": null,
          "assay": null,
          "covariates": "age // population stratification // sex"
        },
        "data_source": "NIAGADS",
        "track_type_display": "GWAS Summary Statistics",
        "feature_type": "variant",
        "endpoint": "https://www.niagads.org/genomics/service/track/gwas",
        "name": "IGAP Rare Variants: Stage 1 (GRCh38) (Kunkle et al. 2019)",
        "track": "NG00075_GRCh38_STAGE1",
        "displayMode": "EXPANDED",
        "type": "gwas_service",
        "id": "NG00075_GRCh38_STAGE1",
        "supportsWholeGenome": false,
        "visibilityWindow": 1000000,
        "removable": true,
        "reader": {
          "config": {
            "endpoint": "https://www.niagads.org/genomics/service/track/gwas",
            "track": "NG00075_GRCh38_STAGE1"
          },
          "endpoint": "https://www.niagads.org/genomics/service/track/gwas",
          "indexed": false,
          "track": "NG00075_GRCh38_STAGE1"
        },
        "queryable": true,
        "expandQuery": false,
        "sourceType": "custom"
      },
      {
        "feature_type": "variant",
        "endpoint": "https://www.niagads.org/genomics/service/track/variant",
        "consortium": "ADSP",
        "name": "ADSK 17K R3 Variants",
        "label": "ADSK 17K",
        "track": "ADSP_17K",
        "track_type": "variant_service",
        "data_source": "NIAGADS",
        "track_type_display": "Variant Annotation",
        "displayMode": "EXPANDED",
        "type": "variant_service",
        "id": "ADSP_17K",
        "supportsWholeGenome": false,
        "visibilityWindow": 1000000,
        "removable": true,
        "reader": {
          "config": {
            "endpoint": "https://www.niagads.org/genomics/service/track/variant",
            "track": "ADSP_17K"
          },
          "endpoint": "https://www.niagads.org/genomics/service/track/variant",
          "indexed": false,
          "track": "ADSP_17K"
        },
        "queryable": true,
        "expandQuery": false,
        "sourceType": "custom",
        "metadata": {
          "Description": "Variants from the Alzheimer''s Disease Sequencing Project (ADSP) 17K R3 whole genome sequencing effort - INDELs and SNVs that passed the ADSP biallelic quality control (QC) criteria. Variants are annotated by the ADSP Annotation Pipeline."
        }
      },
      {
        "biosample_characteristics": {
          "defintion": "A CD4-positive, alpha-beta T cell that has differentiated into a memory T cell.",
          "gender": null,
          "anatomical_system": "cardiovascular system",
          "flags": {
            "is_differentiated": "TBD",
            "cell_line": null,
            "is_cancer": "TBD",
            "is_stem_cell": "TBD"
          },
          "diagnosis": null,
          "mapped_value": "CL:0000897",
          "biosample_type": "primary cell",
          "tissue": "blood",
          "term_id": "CL_0000897",
          "biomarker": null,
          "APOE carrier status": null,
          "population": null,
          "biosample": "CD4-positive, alpha-beta memory T cell",
          "neuropathology": null
        },
        "format": "bed",
        "indexURL": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz.tbi",
        "description": "ENCODE roadmap CD4+ alpha-beta memory T cell (repl. 1) ChIP-seq H3K36me3-histone-mark peaks (narrowPeak) [Orig: Cell type=CD4-positive, alpha-beta memory T cell;Lab=ENCODE Processing Pipeline]",
        "label": "ENCODE roadmap CD4+ alpha-beta memory T ...",
        "repository": "NIAGADS (FILER)",
        "track_type": "annotation",
        "experimental_design": {
          "antibody_target": "H3K36me3",
          "assay": "ChIP-seq",
          "covariates": null
        },
        "url": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz",
        "data_source": "ENCODE",
        "track_type_display": "Functional Genomics",
        "feature_type": "histone modification",
        "name": "ENCODE roadmap CD4+ alpha-beta memory T cell ChIP-seq H3K36me3",
        "track": "NGEN024525",
        "displayMode": "expanded",
        "type": "annotation",
        "id": "NGEN024525",
        "supportsWholeGenome": true,
        "visibilityWindow": -1,
        "removable": true
      },
      {
        "biosample_characteristics": {
          "defintion": "A paired organ of the urinary tract which has the production of urine as its primary function.",
          "gender": null,
          "anatomical_system": "renal system",
          "flags": {
            "is_differentiated": "TBD",
            "cell_line": null,
            "is_cancer": "TBD",
            "is_stem_cell": "TBD"
          },
          "diagnosis": null,
          "mapped_value": "UBERON:0002113",
          "biosample_type": "tissue",
          "tissue": "renal system",
          "term_id": "UBERON_0002113",
          "biomarker": null,
          "APOE carrier status": null,
          "population": null,
          "biosample": "kidney",
          "neuropathology": null
        },
        "format": "bed",
        "indexURL": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz.tbi",
        "description": "ENCODE roadmap Kidney (repl. 1) ChIP-seq H3K4me1-histone-mark peaks (narrowPeak) [Orig: Cell type=kidney;Lab=ENCODE Processing Pipeline]",
        "label": "ENCODE roadmap Kidney ChIP-seq H3K4me1",
        "repository": "NIAGADS (FILER)",
        "track_type": "annotation",
        "experimental_design": {
          "antibody_target": "H3K4me1",
          "assay": "ChIP-seq",
          "covariates": null
        },
        "url": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz",
        "data_source": "ENCODE",
        "track_type_display": "Functional Genomics",
        "feature_type": "histone modification",
        "name": "ENCODE roadmap Kidney ChIP-seq H3K4me1",
        "track": "NGEN024585",
        "displayMode": "expanded",
        "type": "annotation",
        "id": "NGEN024585",
        "supportsWholeGenome": true,
        "visibilityWindow": -1,
        "removable": true
      }
    ];