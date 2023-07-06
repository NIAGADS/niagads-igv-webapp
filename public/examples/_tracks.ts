import { TrackBaseOptions } from "@browser-types/tracks";

export const config: TrackBaseOptions[] = [
  {
    name: "FILER parsing test: narrowpeak / no header",
    description: "testing bigBed, as filer bed",
    id: "narrowpeak_TEST",
    type: "annotation",
    format: "narrowpeak",
    url: "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/DNase-seq/broadpeak/hg38/ENCFF195KQC.bed.gz",
    indexURL: "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/DNase-seq/broadpeak/hg38/ENCFF195KQC.bed.gz.tbi"
  },
  {
    name: "GTEx Whole Blood eQTL",
    type: "eqtl",
    format: "bed6+13",
    description: "test track; only has data in ABCA7 region",
    id: "EQTL_TEST",
    url: "http://localhost:3000/examples/files/GTEx_v8_whole_blood_eQTL_ABCA7_regions.bed.gz",
    indexURL: "http://localhost:3000/examples/files/GTEx_v8_whole_blood_eQTL_ABCA7_regions.bed.gz.tbi",
  },
  {
    url: "/service/track/variant",
    name: "ADSK 17K R3 Variants",
    type: "variant_service",
    format: "webservice",
    visibilityWindow: 1000000,
    queryable: true,
    description:
      "Variants from the Alzheimer''s Disease Sequencing Project (ADSP) 17K R3 whole genome sequencing effort - INDELs and SNVs that passed the ADSP biallelic quality control (QC) criteria. Variants are annotated by the ADSP Annotation Pipeline.",
    id: "ADSP_17K",
    order: 1,
  },
  {
    description:
      "summary statistics from meta-analysis results obtained in the stage 1 GWAS study, including genotyped and imputed data (11,480,632 variants, phase 1 integrated release 3, March 2012) of 21,982 Alzheimer's disease cases and 41,944 cognitively normal controls. The meta-analysis examined SNPs genotyped or imputed in at least 30% of the AD cases and 30% of the control samples across all datasets. (Lifted Over from GRCh37 to GRCh38)",
    url: "/service/track/gwas",
    name: "IGAP Rare Variants: Stage 1 (GRCh38) (Kunkle et al. 2019)",
    type: "gwas_service",
    format: "webservice",
    visibilityWindow: 1000000,
    queryable: true,
    id: "NG00075_GRCh38_STAGE1",
  },
  {
    url: "/service/track/gwas",
    name: "IGAP Rare Variants: Stage 2 (GRCh38) (Kunkle et al. 2019)",
    type: "gwas_service",
    format: "webservice",
    visibilityWindow: 1000000,
    queryable: true,
    description: "IGAP Rare Variants: Stage 2 (GRCh38) (Kunkle et al. 2019)",
    id: "NG00075_GRCh38_STAGE2",
  },
  {
    format: "bed",
    url: "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz",
    indexURL:
      "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF002JKH.bed.gz.tbi",
    description:
      "ENCODE roadmap CD4+ alpha-beta memory T cell (repl. 1) ChIP-seq H3K36me3-histone-mark peaks (narrowPeak) [Orig: Cell type=CD4-positive, alpha-beta memory T cell;Lab=ENCODE Processing Pipeline]",
    name: "ENCODE roadmap CD4+ alpha-beta memory T cell ChIP-seq H3K36me3",
    type: "annotation",
    id: "NGEN024525",
  },
  {
    format: "bed",
    description:
      "ENCODE roadmap Kidney (repl. 1) ChIP-seq H3K4me1-histone-mark peaks (narrowPeak) [Orig: Cell type=kidney;Lab=ENCODE Processing Pipeline]",
    url: "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz",
    indexURL:
    "https://tf.lisanwanglab.org/GADB/Annotationtracks/ENCODE/data/ChIP-seq/narrowpeak/hg38/1/ENCFF007WQK.bed.gz.tbi",
    name: "ENCODE roadmap Kidney ChIP-seq H3K4me1",
    type: "annotation",
    id: "NGEN024585",
  },
];
