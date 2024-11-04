import DOMPurify from 'dompurify';
import FileSaver from 'file-saver';
import { marked } from 'marked';
import { jsx } from 'slate-hyperscript';
import { v4 as uuidv4 } from 'uuid';
import showdown from 'showdown'
export const withId = (editor) => {
  const { apply } = editor;

  editor.apply = (operation) => {
    // console.log('operation',operation)
    switch (operation.type) {
      // case 'set_selection':
      // return
      case 'insert_node':
        if (!operation.node.id && Object.isExtensible(operation.node)) {
          operation.node.id = uuidv4();
        }
        break;
      case 'split_node':
        if (operation.path.length === 1) {
          operation.properties.id = uuidv4();
        }
        break;
    }
    apply(operation);
  };

  return editor;
};
import {
  createEditor,
  Node,
  Editor,
  Transforms,
  Range,
  Text,
  Element as SlateElement,
} from "slate";

// 自定义 marked 的渲染器
// const renderer = new marked.Renderer();

// renderer.list = function (body, ordered, start) {
//   // 将列表转换为段落
//   return body;
// };
// renderer.listitem = function (text) {
//   // 将列表项转换为段落
//   return `<li>${text}</li>`;
// };

// renderer.paragraph = function (text) {
//   // 保持段落的渲染
//   return `<p>${text}</p>`;
// };

export const hml = `人体工学椅与爆破学相关的研究可以从多个角度进行探讨。首先，人体工学椅的设计与评估涉及到了对人体姿态的深入理解和爆破学原理的应用。例如，Mao<sup>1</sup>的研究通过生成不同坐姿的虚拟模型，结合了人体几何学与椅子设计的互动，从而评估椅子的舒适性及对人体工程学的影响。此外，Bolis<sup>2</sup>提出的观点强调了人体工程学在可持续发展中的作用，这可能与爆破学中关于系统稳定性和动态平衡的考量相呼应。

1. 人体工学椅的设计与评估方法
   人体工学椅的设计不仅仅关注椅子的形态，还包括了对坐姿的监测和改善。Nizam<sup>4</sup>和Gelaw<sup>7</sup>的研究通过开发智能监测系统，实时跟踪坐姿并给出反馈，以提高坐姿的合规性，减少因长时间不良坐姿引起的身体损害。这些技术在一定程度上借鉴了爆破学中对动态行为的分析。

2. 坐姿与人体工程学在健康促进中的应用
   不良坐姿是全球导致残疾调整寿命年的主要原因之一。因此，Shan<sup>8</sup>等人开发的生物启发式的人机交互系统，可以通过模拟人体感觉神经元的运动感觉过程，来感知人体肌肉和关节的运动状态，有助于预防因坐姿不当引起的健康问题。

3. 智能监测技术与人体工程学的结合
   Bourahmoune<sup>9</sup>和Adane<sup>6</sup>的研究展示了智能坐垫如何结合机器学习技术，通过实时监测和识别坐姿，提供坐姿训练和伸展指导，体现了人体工程学与智能技术相结合的潜力。

4. 人体工学在复杂系统中的应用
   Thatcher<sup>5</sup>和 Holden<sup>3</sup>的研究扩展了人体工程学的应用范围，将其应用于理解全球性问题，如老龄化、慢性病管理以及医疗系统的改进。这些研究强调了在复杂系统中，如爆破学所关注的动态平衡和系统稳定性，人体工程学原理的重要性
#### **人体工学椅的设计原则与爆破学理论**
人体工学椅的设计原则与爆破学理论结合的研究领域，主要涉及人体工程学、生物力学、计算机模拟和材料科学等。以下是对相关文献的综述：

在人体工程学椅设计方面，文献11提出了一个自动生成坐姿的算法，用于评估椅子的舒适度。该算法基于人体几何扫描数据，考虑了椅子设计的人体工程学指南，如压力分布和支持强度，并将3D椅子模型与人体-椅子交互的几何形状相结合。该算法通过粗略和精细级别的姿态变形，定义了一个包含接触、碰撞和关节限制的非线性能量函数，并使用爬山算法求解。该方法可量化评估椅子模型在各种人体工程学标准方面的性能。

在爆破学理论方面，文献12-14、16和17探讨了垂直冲击下人体受伤害的预测模型。这些研究通过建立非线性多体模型，考虑了安全带和座椅缓冲装置对人体的约束作用，优化模型参数，并进行了数值计算和实验验证。这些模型有助于评估和降低乘员伤害，指导座椅元件与座椅系统的匹配过程。

文献15和20研究了人体在垂直载荷下的机械响应和容忍度。文献15通过实验室测试，研究了人体骨盆在模拟爆炸载荷下的响应，并提出了人体损伤概率曲线。文献20则研究了铁路车辆防撞柱的前瞻性设计策略和方法，通过理论计算、结构设计、数值模拟和实验验证，提出了新型防撞柱，具有良好的弹塑性性能。

综合以上研究，人体工学椅的设计原则与爆破学理论结合的研究，旨在通过精确的人体模型和先进的计算机模拟技术，评估和优化产品的人体工程学性能，提高乘员的舒适度和安全性。这些研究为人体工程学椅的设计提供了重要的理论依据和技术支持。综上所述，人体工学椅的设计原则与爆破学理论的结合研究，围绕提升乘员舒适度和安全性这一核心目标，展现了多学科交叉的研究特色。文献11提出的自动生成坐姿算法，为评估椅子舒适度提供了新的量化方法，而文献12-14、16和17则从爆破学角度出发，构建了预测人体受伤害的模型，并通过实验验证了其有效性。文献15和20在探索人体对垂直载荷的机械响应和容忍度方面，提供了重要的实验数据和理论支持。这些研究不仅为人体工程学椅的设计提供了理论依据，也推动了相关领域的技术进步。

这些文献的主要贡献在于，一方面，它们深化了对人体工程学设计的理解，将人体模型和计算机模拟技术相结合，提高了设计的精确性和科学性；另一方面，爆破学理论的引入为评估和优化座椅在极端条件下的安全性提供了新的视角，丰富和完善了现有的安全评估体系。特别是通过建立非线性多体模型，以及开发新型弹塑性良好的防撞结构，为降低乘员伤害、提高生存率提供了重要的技术支持。

面对未来，这一领域的研究可以从以下方向深入：首先，继续探索更为精确和实时的人体扫描技术，以进一步提升椅子设计的人体工程学适配性；其次，结合生物力学和材料科学的发展，开发更为安全和舒适的座椅缓冲装置；最后，考虑到环境因素和个体差异，研究多参数、多模态的人体损伤预测模型，以实现更加个性化的座椅设计。通过这些研究方向的探索，人体工学椅的设计原则与爆破学理论的结合将更加紧密，为人类提供更为安全、舒适的坐姿环境。
#### **智能监测技术在坐姿改善中的应用**
在探讨智能监测技术在坐姿改善中的应用这一研究问题过程中，以下内容可作为文献综述的构成部分：

**技术发展与坐姿监测**

随着传感技术和人工智能的快速发展，坐姿监测和改善的研究逐渐成为热点。例如，Bourahmoune等人（2019）开发的LifeChair智能坐垫结合了压力感应技术和机器学习算法，实现了对超过13种不同坐姿的实时识别，准确率高达98.93%。Nizam等人（2020）则设计了一种基于Android的低成本坐姿监测系统，通过简单的电子元件和应用程序，实现了对坐姿的实时监控和反馈。

**智能分类与坐姿纠正**

在坐姿分类和纠正方面，Vermander等人（2023）提出了一种基于多层神经网络的智能分类器，用于轮椅用户的坐姿分类。该研究通过压力传感器收集数据，并采用了一种创新的监测设备。另一方面，Chung等人（2019）设计并实现了一种利用可穿戴项链传感器进行姿势校正的系统，通过深度相机和智能手机应用程序，帮助用户自我监测和调整坐姿。

**多模态传感器与数据分析**

多模态传感器在坐姿监测中的应用也日益增多。Matuska等人（2020）提出的智能椅搭载了六个柔性力传感器，结合物联网技术，通过移动应用程序向用户提供坐姿反馈。Jeong等人（2021）开发的混合传感器智能椅系统，结合了压力传感器和红外反射距离传感器，实现了对坐姿的实时监测和分类。

**可穿戴技术与健康促进**

在可穿戴技术领域，Abro等人（2019）研发了一种基于柔性传感器的智能服装，用于监测身体关节的弯曲角度。Yang等人（2022）则提出了一种基于摩擦电纳米发电机的自供电坐姿监测背心，结合机器学习算法，实现了高准确度的坐姿识别。

**前瞻性坐姿监测与提醒系统**

针对特定坐姿问题，如前倾坐姿，Takayama等人（2021）利用eSense技术开发了坐姿检测和改善提醒系统。Gelaw等人（2021）则构建了智能椅系统，通过压力传感器收集数据，运用机器学习方法预测健康坐姿，并通过模型评估，为用户提供坐姿改善建议。

**讨论与展望**

这些研究展示了智能监测技术在坐姿改善领域的广泛应用和巨大潜力。未来的研究可以进一步探索以下方面：

1. 提高监测系统的准确性和实时性，以适应不同用户和场景的需求。
2. 开发更多用户友好、成本效益高的坐姿监测和改善解决方案。
3. 结合大数据和云计算技术，进行长期的坐姿健康监测和分析。
4. 集成更多智能硬件和软件，提供个性化的坐姿纠正和健康指导。

通过这些研究，我们可以期待智能监测技术在坐姿改善领域发挥更大的作用，为人们的健康和生活质量带来积极影响。在探讨智能监测技术在坐姿改善中的应用这一研究问题上，现有文献展示了一系列有价值的研究成果和趋势。综合分析，可以发现，智能坐姿监测技术主要通过传感器的运用、数据分析以及与用户的互动反馈来实现。研究如Bourahmoune等人（2019）和Nizam等人（2020）所示，不仅提高了坐姿识别的准确率，还通过创新的监测设备，如压力传感器和智能穿戴设备，实现了对多种坐姿的分类与纠正<sup>参考文献的序号</sup>。

这些研究对坐姿改善领域的贡献是显著的。一方面，它们推动了智能监测技术在坐姿健康领域的应用，如Vermander等人（2023）和Chung等人（2019）的研究所示，通过引入多层神经网络和可穿戴传感器技术，提高了坐姿监测的智能化水平，为用户提供了个性化的坐姿改善建议<sup>参考文献的序号</sup>。另一方面，多模态传感器和数据分析技术的发展，如Matuska等人（2020）和Jeong等人（2021）的研究，为监测系统的多样性和精确性提供了新的可能性<sup>参考文献的序号</sup>。

展望未来，智能监测技术在坐姿改善领域的深入研究可从以下几个方面展开：首先，结合大数据和云计算技术，对用户坐姿进行长期跟踪和健康分析，为个性化坐姿改善提供更为科学的依据。其次，研究可以专注于开发更加低成本、易于普及的监测设备，如Abro等人（2019）和Yang等人（2022）所提出的自供电可穿戴设备，以促进智能坐姿监测技术的广泛应用<sup>参考文献的序号</sup>。最后，Takayama等人（2021）和Gelaw等人（2021）的研究提示我们，通过引入更为智能的提醒系统，结合用户行为和习惯，可以进一步提升坐姿改善的效果和用户的依从性<sup>参考文献的序号</sup>。

综上所述，智能监测技术在坐姿改善领域的应用正逐步深入，不仅为用户提供了实时的坐姿纠正建议，也为健康监测和预防提供了新的视角。未来的研究应继续探索技术的创新与整合，以实现更加高效、精确的坐姿监测，为提升公众的健康和生活质量做出更大的贡献。
#### **人体工程学在健康促进和慢性病管理中的作用**
人体工程学在健康促进和慢性病管理中扮演着重要的角色。以下是一些相关的研究内容：

1. 编号31的文章强调了生活方式和更广泛的环境作为健康和慢性疾病发展的主要决定因素的重要性。文章提出，健康和疾病是系统属性，需要作为系统来对待。

2. 编号32的文章探讨了慢性病管理和移动健康(mHealth)的促进因素和障碍。研究结果显示，通过mHealth进行药物提醒、实验室测试和医生咨询的提醒，以及自我管理教育，可以帮助改善慢性病管理。

3. 编号33的文章提供了中国农村地区在初级保健中加强慢性病管理的证据。研究表明，与中等管理强度的患者相比，高强度管理下的患者有更多的初级保健访问，更少的专科访问，更低的住院概率，以及更低的医疗费用。

4. 编号34的文章描述了一个创新的在线门诊中心方法，通过自我管理来帮助生活方式的改变，以对抗慢性疾病。该计划包括一个在线支持系统，为移动患者设备提供灵活和集成的模块。

5. 编号35的文章探讨了自我护理行为在疾病知识和社会支持对心力衰竭患者健康相关生活质量影响中的中介作用。

6. 编号36的文章研究了健康教练对慢性肾病患者自我管理和生活质量的影响。结果表明，健康教练可以有效地提高自我效能和激活水平，从而进一步改善自我管理和生活质量。

7. 编号37的文章评估了中国江苏省老年慢性病患者的行为及其决定因素。结果显示，社交活动是改善健康行为的重要方面。

8. 编号38的文章探讨了慢性疾病对老年人心理压力的影响，以及日常生活活动和感知社会支持的中介和调节作用。

9. 编号39的文章研究了社交参与对中国慢性病老年人健康行为和生命质量的重要性。

10. 编号40的文章评估了中国分级医疗体系改革对慢性病患者健康结果和医疗支出的影响。研究结果表明，改革与更好的临床质量表现和治疗成本节约相关。

综上所述，人体工程学在健康促进和慢性病管理中的作用体现在通过生活方式的改变、移动健康技术的应用、初级保健的加强、在线支持系统的提供、自我护理行为的促进、健康教练的干预、社交参与的增加等方面。这些研究为慢性病管理提供了多方面的启示。在探讨人体工程学在健康促进和慢性病管理中的作用过程中，文献综述揭示了几个关键的研究趋势和主题。综合上述研究<sup>31-40</sup>，我们发现生活方式的改变、移动健康技术的应用、初级保健的加强、在线支持系统的提供、自我护理行为的促进、健康教练的干预以及社交活动的参与等因素，对人体工程学在慢性病管理中的作用至关重要。这些研究发现不仅强调了环境和行为因素在健康和慢性病发展中的重要性，还为慢性病管理提供了多角度的干预策略。

所综述的文献对研究领域的贡献表现在以下几个方面：首先，研究者们通过实证研究，揭示了生活方式和环境因素在慢性病管理中的系统性和综合性影响<sup>31</sup>。其次，移动健康技术的应用为慢性病自我管理提供了新的途径<sup>32</sup>，而在线门诊中心和健康教练的介入则展示了个性化健康管理的前景<sup>34</sup><sup>36</sup>。此外，对初级保健的强化和分级医疗体系改革的探索<sup>33</sup><sup>40</sup>，为改善慢性病患者的健康结果和降低医疗支出提供了政策依据。研究还强调了社交活动和自我护理行为在提高患者生活质量中的作用<sup>35</sup><sup>37</sup><sup>39</sup>，为慢性病管理增添了社会心理层面的干预策略。

基于这些发现，未来的研究方向应当关注以下几个方面：首先，应进一步探索如何将移动健康技术与慢性病管理有效结合，以提高患者的自我管理能力和治疗依从性。其次，研究可以关注健康教练和在线支持系统在个性化健康管理中的作用，以及如何优化这些干预措施以提高其普及率和有效性。此外，社交活动和心理因素的介入也是未来研究的重要方向，特别是在中国这样一个高度重视社会和谐与家庭支持的文化背景下。最后，针对分级医疗体系改革的长期效果和影响机制的研究，将对政策制定和医疗资源配置产生深远影响。

综上所述，人体工程学在健康促进和慢性病管理中的作用日益凸显，不仅为慢性病干预提供了多元化的策略，也为未来研究指明了方向。通过这些研究，我们有望构建一个更为全面、高效和人性化的慢性病管理体系。
#### **可持续发展视角下的人体工程学与爆破学结合**
在探讨可持续发展视角下的人体工程学与爆破学结合的研究问题之前，我们可以从以下几个具体方面对上述文献进行综述：

1. 爆破技术与可持续发展

随着矿产资源开发向深部延伸，爆破技术在提高开采效率方面发挥着关键作用。然而，传统的爆破方法可能对环境造成破坏，影响可持续发展。编号44的文献指出了深部金属矿产资源开采所面临的工程挑战，并提出了一系列关键工程技术的创新重点，如岩石爆裂的预测与预防、冷却技术、岩石支护技术等。此外，编号46的文献介绍了一种非爆炸性隧道开挖技术——瞬时膨胀（IE），这种技术以固体废弃物如煤矸石和稻草为原料，既实现了废物的再利用，又降低了成本，具有较好的环保和可持续性。

2. 爆破模拟与人体工程学

人体工程学在爆破模拟中的应用主要体现在提高爆破效果和降低对周边环境的影响。编号41和45的文献提出了基于变量域方法和非普通态基于状态的爆破模拟方法，这些方法可以更准确地描述岩石在爆炸载荷下的力学行为，有助于优化爆破设计，减少对周围环境的影响。同时，编号43的文献通过自主研发的GPGPU并行化FDEM技术模拟岩石爆破，为人体工程学在爆破领域的应用提供了新的计算方法。

3. 爆破安全与人体工程学

爆破安全是人体工程学关注的重点。编号48和50的文献通过数值方法和实验研究探讨了水下隧道和地下结构在爆炸载荷下的动态响应和破坏模式，为评估和优化爆破安全提供了重要依据。此外，编号49的文献从建筑工程中汲取灵感，提出了机械增强的生物管用于动脉替换和动静脉吻合，虽然与爆破学关系不大，但这一研究展示了人体工程学在提高生物组织力学性能方面的潜力。

4. 可持续发展视角下的结合

在可持续发展视角下，人体工程学与爆破学的结合应关注以下方面：

- 绿色爆破技术：开发环境友好型爆破技术，减少爆破过程中的有害物质排放，降低对生态环境的影响。
- 资源循环利用：推广编号46文献中提到的IE技术等非传统爆破方法，实现废物资源化利用。
- 安全与效率：通过人体工程学原理优化爆破设计，提高爆破效率，同时确保施工安全。
- 长期稳定性：考虑爆破工程对周边环境和地下结构长期稳定性的影响，避免因爆破导致的地质灾害。

综上所述，从可持续发展视角看，人体工程学与爆破学的结合需要在技术创新、环境保护、资源利用和安全保障等多方面进行深入研究和实践。结合上述文献综述，我们可以看出，在可持续发展视角下，人体工程学与爆破学的结合主要聚焦于以下几个方面：

1. 爆破技术的绿色化与资源循环利用：当前研究强调了开发环境友好型爆破技术，减少对生态环境的影响，同时推动废物资源化利用，如IE技术的应用。

2. 爆破模拟与优化设计：通过人体工程学原理，运用先进的模拟技术，优化爆破设计，提高爆破效率，降低对周边环境的影响。

3. 爆破安全与风险评估：关注爆破作业的安全性，利用人体工程学原理进行风险评估和爆破安全评估，保障人员安全和工程稳定性。

对于未来研究方向，以下建议可供参考：

- 探索新型环保爆破材料和方法，进一步减少爆破作业的环境影响。
- 结合人工智能和大数据分析，提高爆破模拟的精确度和实用性。
- 发展更为完善的爆破安全评估体系，将人体工程学原理与爆破作业紧密结合，提升作业人员的安全保障。
- 推广绿色爆破技术和资源循环利用的成功案例，促进产业界的可持续发展实践。

综上所述，可持续发展视角下的人体工程学与爆破学结合的研究问题，不仅涉及技术层面的创新，还包括环境保护、资源利用和人员安全等多方面的考量。通过不断探索与实践，有望为爆破行业的可持续发展提供有力支撑。
#### **复杂系统中的人体工程学应用：从设计到全球问题解决**
在复杂系统中的人体工程学应用领域，研究文献主要聚焦于以下几个关键点：

1. **系统分析与工具开发**：文献51指出，为了应对21世纪的全球性问题，如可持续性，需要将复杂系统的理解更全面地整合到人体工程学和工效学的系统分析工具集中。研究评估了三种常见系统分析工具（Accimap、系统理论事故映射与过程、认知工作分析）在应对这些修改后的标准方面的表现。该研究还通过将两种工具（Accimap和系统理论事故映射与过程）应用于跨国食品完整性系统问题，进一步探讨了这些工具的适用性。结果表明，没有任何单一的系统分析方法可以单独使用来帮助确定关键干预点，因此可能需要开发新的方法或调整现有方法来理解这些动态、适应性系统。

2. **性别平等的设计**：文献52探讨了如何使用结构化的人体工程学方法来解决性别数据差距问题。研究应用了社会技术系统设计工具包，利用认知工作分析中的因果循环图和抽象层次建模来理解问题发生的系统和关键痛点，然后应用设计意图工具包来生成设计想法。研究共开发了43个可以由大学实施的想法，以解决研究数据差距。这一应用展示了人体工程学方法在解决复杂问题方面的效用，并为人体工程学社区提供了反思性别敏感研究实践和性别平等更广泛重要性的机会。

3. **计算建模与仿真**：文献53强调计算建模和仿真是解决当代人体工程学问题的一种潜在方法。研究通过描述计算建模在团队合作、人群行为和工程供应链性能中的应用来展示其潜力。这些例子突出了多学科方法在计算建模中的优点和挑战，并展示了人体工程学在开发和增强复杂社会技术系统方面的作用。研究还反思了设计计算模型的实际问题和经验教训，以便计算建模和仿真成为人体工程学家工具箱中的标准且有价值的技术。

4. **环境健康干预设计**：文献57讨论了系统科学方法如何应用于全球环境健康研究，以增强家庭空气污染（HAP）和水资源、卫生设施（WASH）项目的干预设计和实施。研究强调了系统科学方法在理解现有系统结构和行为、促进利益相关者之间的理解和协议、以及指导干预和政策制定方面的作用。系统方法还帮助解释了由于变量间相互作用而产生的系统涌现属性，导致复杂的系统行为和有时违反直觉的结果。

这些研究文献展示了人体工程学在复杂系统中的应用范围，从设计到全球问题的解决，涉及系统分析与工具开发、性别平等设计、计算建模与仿真，以及环境健康干预设计等多个方面。这些研究为人体工程学在复杂系统中的应用提供了重要的见解和方向。在探讨复杂系统中人体工程学的应用这一主题时，我们发现现有文献主要围绕系统分析与工具开发、性别平等的设计、计算建模与仿真以及环境健康干预设计等关键领域展开。这些研究不仅对理解复杂系统中的工效学问题提供了深刻的见解，也展示了如何运用多学科方法来解决21世纪全球性问题的新路径。

总体来看，这些研究文献<sup>51</sup><sup>52</sup><sup>53</sup><sup>57</sup>共同指出，面对复杂系统，单一的系统性分析方法已无法满足需求，因此，开发新工具或调整现有方法成为必然趋势。特别是文献中提到的系统分析工具在实际应用中的表现，强调了跨学科方法在揭示系统动态和适应性方面的价值。同时，性别平等的设计研究<sup>52</sup>不仅提出了具有针对性的解决方案，也体现了人体工程学在促进社会公正和包容性方面的潜力。

这些文献对研究领域的贡献是显著的。它们不仅提供了新的理论视角，如计算建模与仿真在预测复杂系统行为中的应用<sup>53</sup>，还为实践领域带来了创新的设计理念和方法，如环境健康干预设计<sup>57</sup>中系统科学方法的应用，这些都极大地扩展了传统人体工程学的理论框架。

未来研究方向应着重于以下几个方面：首先，应继续探索和开发能够更全面捕捉复杂系统特征的工效学工具。其次，性别平等和多样性在人体工程学设计中的融入值得进一步的重视和研究。此外，计算建模与仿真技术的进步将为人体工程学提供新的实验平台，有助于在虚拟环境中预测和分析人体在复杂系统中的行为和表现。最后，环境健康干预设计的系统化方法可以为全球公共卫生问题提供更为科学和有效的解决方案。

综上所述，复杂系统中的人体工程学应用研究不仅揭示了当前工效学在设计及全球问题解决中的挑战，也为未来的研究提供了丰富的方向和可能性。通过不断探索跨学科的方法和理论，人体工程学有望在复杂系统中发挥更大的作用，为构建更加可持续和公正的社会贡献力量。`;
export  function deserializeHTML(markdownString:string) {
  console.log(markdownString)
  // 使用 marked 将 Markdown 转换为 HTML，并使用自定义渲染器
  let htmlString = marked(markdownString);
  // 使用 DOMPurify 清理 HTML

  htmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
  // 将 HTML 字符串解析为 DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  // 递归解析 DOM 节点并生成 Slate.js 节点
  function deserializeNode(node) {
    if (node.nodeType === 3) {
      if (node.textContent.trim() === '') {
        return null;
      }
      return node.textContent;
    } else if (node.nodeType !== 1) {
      return null;
    }

    const tagName = node.nodeName.toLowerCase();
    const children = Array.from(node.childNodes).map((node) =>
      deserializeNode(node, 2),
    );
    if (children.length === 0) {
      return null;
    }
    switch (tagName) {
      case 'p':
        return jsx('element', { type: 'p' }, ...children);
      case 'strong':
        return children.map((child) => jsx('text', { bold: true }, child));
      case 'sup':
        return children.map((child) =>
          jsx('text', { superscript: true }, child),
        );
      case 'h1':
        return jsx('element', { type: 'h1' }, ...children);
      case 'h2':
        return jsx('element', { type: 'h2' }, ...children);
      case 'h3':
        return jsx('element', { type: 'h3' }, ...children);
      // case 'ul':
      //   return jsx('element', { type: 'bulleted-list' }, ...children);
      // case 'ol':
      //   return jsx('element', { type: 'numbered-list' }, ...children);
      // case 'li':
      //   return jsx('element', { type: 'list-item' }, ...children);
      case 'li':
        const index = node.getAttribute('data-index');
        const attr = {
          indent: 1,
          listStyleType: index > 0 ? 'decimal' : 'disc',
          listStart: index,
        };
        return jsx('element', { type: 'p', ...attr }, ...children);
      case 'hr':
        return jsx('element', { type: '' }, ...children);
      default:
        return jsx('element', { type: 'p' }, ...children);
    }
  }

  // 开始递归解析
  const children = Array.from(doc.body.childNodes).map(deserializeNode);
  const result = jsx('fragment', {}, ...children);
  const _ = result?.filter((item) => item.type);

  return _;
}

function serializeNode(node) {
  if (node.text) {
    let text = node.text;

    // 处理文本样式
    if (node.bold) {
      text = `**${text}**`;
    }
    if (node.italic) {
      text = `_${text}_`;
    }

    return text;
  }

  const children = node.children
    ? node.children.map((n) => serializeNode(n)).join('')
    : '';

  switch (node.type) {
    case 'p':
      return `${children}\n\n`;
    case 'h1':
      return `# ${children}\n\n`;
    case 'h2':
      return `## ${children}\n\n`;
    case 'h3':
      return `### ${children}\n`;
    default:
      return children;
  }
}

export  function slateToMarkdown(value) {
  return value.map((node) => serializeNode(node)).join('');
}

/**
 *
 * @param content markdownstirng字符串转文件
 */

 export function onDownloadEdit(content: string, title: string) {
  // Transforms.deselect(editor);
  const markdownString = content;
  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdownString);
  const blob = new Blob([html], { type: 'application/msword' });
  FileSaver.saveAs(blob, `${title}.docx`);
}



const getDocumentEndPosition = (editor) => {
  const { children } = editor;
  if (!children) return;

  if (children?.length === 0) {
    return null; // 如果文档为空，返回null
  }

  // 获取文档中最后一个节点的路径
  
  const lastNodeIndex = children?.length - 1;
  const lastNodePath = [lastNodeIndex];

  // 获取最后一个节点的末尾位置
  const endPoint = Editor.end(editor, lastNodePath);

  return endPoint;
};

/**
 * 
 * @param editor  获取编辑器总字数
 */
 export function onSetTotalSum(editor) {
  try {
    
 
  const focus = getDocumentEndPosition(editor);
  let length = 0;
  let str = "";
  try {
    str = Editor.string(editor, {
      anchor: { path: [0, 0], offset: 0 },
      focus: focus,
    });
    length = str?.length || 0;
  } catch {}

  setTotalSum(length);
} catch (error) {
    
}
} 

/**
 * 
 * @param editor 获取编辑器实例
 * @param length 获取编辑器选区前后length字符的上下文
 * @returns 
 */

export const getSurroundingText = (editor,length: number = 1000) => {
  const { selection } = editor;

  if (!selection || Range.isCollapsed(selection)) {
    return { before: "", after: "" };
  }

  const { anchor, focus } = selection;

  // 获取选区前100字符
  const beforePoint = Editor.before(editor, anchor, {
    unit: "character",
    distance: length,
  });
  const beforeText = beforePoint
    ? Editor.string(editor, { anchor: beforePoint, focus: anchor })
    : "";

  // 获取选区后100字符
  const afterPoint = Editor.after(editor, focus, {
    unit: "character",
    distance: length,
  });
  const afterText = afterPoint
    ? Editor.string(editor, { anchor: focus, focus: afterPoint })
    : "";

  return {
    before: beforeText,
    after: afterText,
    content: Editor.string(editor, editor.selection),
    selection: editor.selection,
  };
};
const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}


const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};


export const toggleMark = (editor, format, value = true) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value);
  }
};
