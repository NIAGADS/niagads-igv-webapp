import { TrackBaseOptions } from "@igv-types/Tracks"

export const config: TrackBaseOptions[] = [
     {
        "url": "/service/track/variant",
        "name": "ADSK 17K R3 Variants",
        "type": "variant_service",
        "visibilityWindow": 1000000,
        "removable": true,
        "queryable": true,
        "description": "Variants from the Alzheimer''s Disease Sequencing Project (ADSP) 17K R3 whole genome sequencing effort - INDELs and SNVs that passed the ADSP biallelic quality control (QC) criteria. Variants are annotated by the ADSP Annotation Pipeline.",
        "id": "ADSP_17K"
    },
    {
        "description": "summary statistics from meta-analysis results obtained in the stage 1 GWAS study, including genotyped and imputed data (11,480,632 variants, phase 1 integrated release 3, March 2012) of 21,982 Alzheimer's disease cases and 41,944 cognitively normal controls. The meta-analysis examined SNPs genotyped or imputed in at least 30% of the AD cases and 30% of the control samples across all datasets. (Lifted Over from GRCh37 to GRCh38)",
        "url": "/service/track/gwas",
        "name": "IGAP Rare Variants: Stage 1 (GRCh38) (Kunkle et al. 2019)",
        "type": "gwas_service",
        "visibilityWindow": 1000000,
        "removable": true,
        "queryable": true,
        "id": "NG00075_GRCh38_STAGE1"
      },
      {
        "url": "/service/track/gaws",
        "name": "IGAP Rare Variants: Stage 2 (GRCh38) (Kunkle et al. 2019)",
        "type": "variant_service",
        "visibilityWindow": 1000000,
        "removable": true,
        "queryable": true,
        "description": "IGAP Rare Variants: Stage 2 (GRCh38) (Kunkle et al. 2019)",
        "id": "NG00075_GRCh38_STAGE2"
      },
      {
        "format": "bed",
        "indexURL": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz.tbi",
        "description": "ENCODE roadmap CD4+ alpha-beta memory T cell (repl. 1) ChIP-seq H3K36me3-histone-mark peaks (narrowPeak) [Orig: Cell type=CD4-positive, alpha-beta memory T cell;Lab=ENCODE Processing Pipeline]",
        "url": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz",
        "name": "ENCODE roadmap CD4+ alpha-beta memory T cell ChIP-seq H3K36me3",
        "type": "annotation",
        "visibilityWindow": -1,
        "removable": true,
        "id": "NGEN024525"
      },
      {
        "format": "bed",
        "indexURL": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz.tbi",
        "description": "ENCODE roadmap Kidney (repl. 1) ChIP-seq H3K4me1-histone-mark peaks (narrowPeak) [Orig: Cell type=kidney;Lab=ENCODE Processing Pipeline]",
        "url": "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz",
        "name": "ENCODE roadmap Kidney ChIP-seq H3K4me1",
        "type": "annotation",
        "visibilityWindow": -1,
        "removable": true,
        "id": "NGEN024585"
      }
    ];