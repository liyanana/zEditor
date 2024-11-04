import React from 'react';
import type { ReactNode, Ref, PropsWithChildren } from 'react';
import { Editable, withReact, useSlate, ReactEditor } from 'slate-react';
import { cn } from '@udecode/cn';

import { Toolbar } from './index';
import { MarkButton } from '../Button/MarkButton';
import { WithTooltipButton } from '../Button/WithTooltipButton';
import { Line } from '../Line';
import { Select } from '../Select';
import { Icons } from '../Icons';
import { toggleBlock, toggleMark, useWritePageData } from '../logic';
import deserializeHTML from '../slate.ts';
import { Transforms, Node } from 'slate';
import { useParams } from 'umi';
import { FontEnumType, MarkEnumType } from '../logic/type';
import style from './index.less';
import classnames from 'classnames';

const sampleText = `# GLM-130B: An Open Bilingual Pre-trained Model
Aohan Zeng, Xiao Liu, Zhengxiao Du, Zihan Wang, Hanyu Lai, Ming Ding, Zhuoyi Yang, Yifan Xu, Wendi Zheng, Xiao Xia, Weng Lam Tam, Zixuan Ma, Yufei Xue, Jidong Zhai, Wenguang Chen, Peng Zhang, Yuxiao Dong, Jie Tang
## Abstract
We introduce GLM-130B, a bilingual (English and Chinese) pre-trained language model with 130 billion parameters. It is an attempt to open-source a 100B-scale model at least as good as GPT-3 and unveil how models of such a scale can be suc- cessfully pre-trained. Over the course of this effort, we face numerous unexpected technical and engineering challenges, particularly on loss spikes and disconver- gence. In this paper, we introduce the training process of GLM-130B including its design choices, training strategies for both efficiency and stability, and engi- neering efforts. The resultant GLM-130B model offers significant outperformance over GPT-3 175B on a wide range of popular English benchmarks while the per- formance advantage is not observed in OPT-175B and BLOOM-176B. It also con- sistently and significantly outperforms ERNIE TITAN 3.0 260B—the largest Chi- nese language model—across related benchmarks. Finally, we leverage a unique scaling property of GLM-130B to reach INT4 quantization, without quantization aware training and with almost no performance loss, making it the first among 100B-scale models. More importantly, the property allows its effective inference on 4×RTX 3090 (24G) or 8×RTX 2080 Ti (11G) GPUs, the most affordable GPUs required for using 100B-scale models. The GLM-130B model weights are publicly accessible and its code, training logs, related toolkit, and lessons learned are open-sourced at https://github.com/THUDM/GLM-130B. 

## Introduction
Large language models (LLMs), particularly those with over 100 billion (100B) parameters (Brown et al., 2020; Thoppilan et al., 2022; Rae et al., 2021; Chowdhery et al., 2022; Wang et al., 2021), have presented attractive scaling laws (Wei et al., 2022b), where emergent zero-shot and few-shot capabilities suddenly arouse. Among them, GPT-3 (Brown et al., 2020) with 175B parameters pioneers the studies of 100B-scale LLMs by strikingly generating better performance with 32 labeled examples than the fully-supervised BERT-Large model on a variety of benchmarks. However, both GPT-3 (and other 100B-scale ones)—the model itself—and how it can be trained, have been thus far not available to the public. It is of critical value to train a high-quality LLM of such scale with both the model and training process shared with everyone. 
We thus aim to pre-train an open and highly-accurate 100B-scale model with ethical concerns in mind. Over the course of our attempt, we come to realize that pre-training a dense LLM at such a scale raises numerous unexpected technical and engineering challenges compared to training 10B- scale models, in terms of pre-training efficiency, stability, and convergence. Similar difficulties have also been concurrently observed in training OPT-175B (Zhang et al., 2022) and BLOOM- 176B (Scao et al., 2022), further demonstrating the significance of GPT-3 as a pioneer study. 
In this work, we introduce the pre-training of a 100B scale model——GLM-130B, in terms of engi- neering efforts, model design choices, training strategies for efficiency and stability, and quantization for affordable inference. As it has been widely realized that it is computationally unaffordable to empirically enumerate all possible designs for training 100B-scale LLMs, we present not only the successful part for training GLM-130B but also many of the failed options and lessons learned. Particularly, training stability is the decisive factor in the success of training models of such a scale. Different from practices such as manually adjusting learning rates in OPT-175B and using embedding norm in the sacrifice of performance in BLOOM-176B, we experiment with various options and find the strategy of embedding gradient shrink can significantly stabilize the training of GLM-130B. 
Specifically, GLM-130B is a bilingual (English and Chinese) bidirectional dense model with 130 bil- lion parameters, pre-trained over 400 billion tokens on a cluster of 96 NVIDIA DGX-A100 (8×40G) GPU nodes between May 6 and July 3, 2022. Instead of using the GPT-style architecture, we adopt the General Language Model (GLM) algorithm (Du et al., 2022) to leverage its bidirectional at- tention advantage and autoregressive blank infilling objective. Table 1 summarizes the comparison between GLM-130B, GPT-3 and another two open-source efforts—OPT-175B and BLOOM-176B, as well as PaLM 540B (Chowdhery et al., 2022)—a 4× larger model as a reference. 
Altogether, the conceptual uniqueness and engineering efforts enable GLM-130B to exhibit perfor- mance that surpasses the level of GPT-3 on a wide range of benchmarks (in total 112 tasks) and also outperforms PaLM 540B in many cases, while outperformance over GPT-3 has not been observed in OPT-175B and BLOOM-176B (Cf. Figure 1 (a)). For zero-shot performance, GLM-130B is better than GPT-3 175B (+5.0%), OPT-175B (+6.5%), and BLOOM-176B (+13.0%) on LAMBADA (Pa- perno et al., 2016), and achieves 3× better performance than GPT-3 on Big-bench-lite (Srivastava et al., 2022). For the 5-shot MMLU (Hendrycks et al., 2021) tasks, it is better than GPT-3 175B (+0.9%) and BLOOM-176B (+12.7%). As a bilingual LLM also in Chinese, it offers significantly better results than ERNIE TITAN 3.0 260B (Wang et al., 2021)—the largest Chinese LLM—on 7 zero-shot CLUE (Xu et al., 2020) datasets (+24.26%) and 5 zero-shot FewCLUE (Xu et al., 2021) ones (+12.75%). Importantly, as summarized in Figure 1 (b), GLM-130B as an open model is associated with significantly less bias and generation toxicity than its 100B-scale counterparts. 
Finally, we design GLM-130B to empower as many people as possible to conduct 100B-scale LLM studies. First, instead of using 175B+ parameters as OPT and BLOOM, the 130B size is decided because such a size supports inference on a single A100 (8×40G) server. Second, to further lower the GPU requirements, we quantize GLM-130B into INT4 precision without quantization aware training while OPT and BLOOM can only reach INT8. Due to a unique property of the GLM architecture, GLM-130B’s INT4 quantization introduces negligible performance degradation, e.g., -0.74% on LAMBADA and even +0.05% on MMLU, making it still better than the uncompressed GPT-3. This enables GLM-130B’s fast inference with performance guarantee on a server of 4×RTX 3090 (24G) or 8×RTX 2080 Ti (11G), the most ever affordable GPU required for using 100B-scale LLMs to date. 
We open-source the model checkpoints, code, training logs, related toolkits, and lessons learned. `;
interface Props {
  [key: string]: unknown;
}

export const FixedToolbar = (props: Props) => {
  const { className } = props;
  const id = useParams()?.id || '';
  // const { paperMeta, mutateFun } = useWritePageData(id);
  const editor = useSlate();
  const { redo, undo, history } = editor;
  const { redos, undos } = history || {};

  return (
    <Toolbar className={className}>
      <WithTooltipButton
        className={cn(!undos?.length && 'text-gray-300')}
        disabled={!undos?.length}
        tooltip="撤销 (⌘+Z)"
        onClick={() => {
          if (!undos?.length) return;
          undo();
        }}
      >
        <Icons.undo size={20} />
      </WithTooltipButton>
      <WithTooltipButton
        className={cn(!redos?.length && 'text-gray-300')}
        disabled={!redos?.length}
        tooltip="恢复 (⌘+Y)"
        onClick={() => {
          if (!redos?.length) return;
          redo();
        }}
      >
        <span
          className=" inline-block scale-x-[-1] origin-center transform-gpu"
          style={{
            transform: 'scaleX(-1)',
          }}
        >
          <Icons.undo size={20} />
        </span>
      </WithTooltipButton>

      <Line />

      <div id="fixtoolbar_select" className="flex">
        <Select
          defaultValue="p"
          formatType="element"
          dropdownMatchSelectWidth={false}
          options={[
            { value: FontEnumType.正文, label: '正文' },
            { value: FontEnumType.H1, label: 'H1', style: { fontSize: '32px' } },
            { value: FontEnumType.H2, label: 'H2', style: { fontSize: '24px' } },
            { value: FontEnumType.H3, label: 'H3', style: { fontSize: '18px' } },
          ]}
          onChange={value => {
            toggleBlock(editor, value);
          }}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          dropdownRender={menu => <div style={{ width: 'max-content' }}>{menu}</div>}
        />
      </div>

      <Line />

      <MarkButton format={MarkEnumType.Bold} tooltip="Bold (⌘+B)">
        <svg className="icon cursor-pointer" aria-hidden="true">
          <use xlinkHref="#icon-cuti" />
        </svg>
      </MarkButton>
      <MarkButton format={MarkEnumType.Italic} tooltip="Italic (⌘+I)">
        <svg className="icon cursor-pointer" aria-hidden="true">
          <use xlinkHref="#icon-xieti" />
        </svg>
      </MarkButton>
      <MarkButton format={MarkEnumType.Underline} tooltip="Underline (⌘+U)">
        <svg className="icon cursor-pointer" aria-hidden="true">
          <use xlinkHref="#icon-xiahuaxian" />
        </svg>
      </MarkButton>
      <MarkButton format={MarkEnumType.Strikethrough} tooltip="Strikethrough (⌘+⇧+M)">
        <svg
          className="icon cursor-pointer"
          aria-hidden="true"
          style={{
            fontSize: '25px',
            margin: '-3px 0 0 0',
            padding: '0',
          }}
        >
          <use xlinkHref="#icon-deleteFont" />
        </svg>
      </MarkButton>
    
    </Toolbar>
  );
};
