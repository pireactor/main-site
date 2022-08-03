const form = "_form_183vf_1";
const form__form = "_form__form_183vf_6";
const form__headerWrp = "_form__headerWrp_183vf_13";
const form__header = "_form__header_183vf_13";
const form__headerTitle = "_form__headerTitle_183vf_21";
const form__selectors = "_form__selectors_183vf_28";
const form__selectBtn = "_form__selectBtn_183vf_33";
const form__selectBtn_active = "_form__selectBtn_active_183vf_56";
const form__SubmitBtn = "_form__SubmitBtn_183vf_81";
var styles$4 = {
	form: form,
	form__form: form__form,
	form__headerWrp: form__headerWrp,
	form__header: form__header,
	form__headerTitle: form__headerTitle,
	form__selectors: form__selectors,
	form__selectBtn: form__selectBtn,
	form__selectBtn_active: form__selectBtn_active,
	form__SubmitBtn: form__SubmitBtn
};

const counter = "_counter_1hjr6_1";
const counter__counter = "_counter__counter_1hjr6_7";
const counter__input = "_counter__input_1hjr6_12";
const label__tooltipInfo = "_label__tooltipInfo_1hjr6_29";
const counter__btn = "_counter__btn_1hjr6_33";
const counter__label = "_counter__label_1hjr6_65";
const counter__labelText = "_counter__labelText_1hjr6_71";
var styles$3 = {
	counter: counter,
	counter__counter: counter__counter,
	counter__input: counter__input,
	label__tooltipInfo: label__tooltipInfo,
	counter__btn: counter__btn,
	counter__label: counter__label,
	counter__labelText: counter__labelText
};

const radio__label = "_radio__label_10mos_1";
const radio__focus = "_radio__focus_10mos_10";
const radio__input = "_radio__input_10mos_14";
const radio__box = "_radio__box_10mos_21";
const radio__mark = "_radio__mark_10mos_33";
var styles$2 = {
	radio__label: radio__label,
	radio__focus: radio__focus,
	radio__input: radio__input,
	radio__box: radio__box,
	radio__mark: radio__mark
};

var TimeRange = /* #__PURE__ */ (() => ".timerange__scale {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.timerange__legend {\n  display: grid;\n  grid-template-columns: 0.3fr 1fr 1fr 1fr 0.5fr;\n}\n\n.timerange__scale {\n  margin-bottom: 12px;\n}\n\n.timerange__item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-basis: 100%;\n  line-height: 160%;\n  cursor: pointer;\n  position: relative;\n}\n\n.timerange__item label {\n  cursor: pointer;\n}\n\n.timerange__item::before,\n.timerange__item::after {\n  content: \"\";\n  position: absolute;\n  top: 2px;\n  height: 4px;\n  background-color: var(--color-gray);\n  width: 50%;\n  z-index: 0;\n  transition: all 0.3s ease-in-out;\n}\n\n.timerange__item::before {\n  left: 0;\n}\n\n.timerange__item::after {\n  right: 0;\n}\n\n.timerange__item_every .timerange__box {\n  width: 16px;\n  height: 16px;\n}\n\n.timerange__item_every::after,\n.timerange__item_every::before {\n  top: 6px;\n}\n\n.timerange__input {\n  position: absolute;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\n.timerange__box {\n  width: 8px;\n  height: 8px;\n  stroke: #ffffff;\n  flex-shrink: 0;\n  display: block;\n  position: relative;\n  z-index: 5;\n}\n\n.timerange__focus {\n  fill: var(--color-gray);\n  stroke: var(--color-gray);\n  transition: all 0.3s ease-in-out;\n}\n\n.timerange__mark {\n  fill: none;\n  stroke: none;\n}\n\n.timerange__item:hover .timerange__focus {\n  fill: var(--color-hover);\n  stroke: var(--color-hover);\n}\n\n/* Checked */\n.timerange__item_checked::after {\n  background-color: #f100ae;\n}\n\n.timerange__input:checked + * .timerange__focus {\n  fill: #f100ae;\n  stroke: #f100ae;\n}\n\n.timerange__input:checked + * .timerange__mark {\n  fill: #f100ae;\n  stroke: var(--color-lightBlack);\n  stroke-width: 1.5px;\n}\n\n/* Focused */\n.timerange__input:focus + * .timerange__focus {\n  stroke: #f100ae;\n}\n\n.timerange__item:first-of-type {\n  flex-basis: 50%;\n}\n.timerange__item:first-of-type .timerange__box {\n  width: 16px;\n  height: 16px;\n}\n.timerange__item:first-of-type::before {\n  content: none;\n}\n.timerange__item:first-of-type::after {\n  width: 50%;\n  top: 6px;\n}\n\n.timerange__item:last-of-type {\n  flex-basis: 50%;\n}\n.timerange__item:last-of-type .timerange__box {\n  width: 16px;\n  height: 16px;\n}\n.timerange__item:last-of-type::after {\n  content: none;\n}\n.timerange__item:last-of-type::before {\n  width: 50%;\n  top: 6px;\n}\n\n.timerange__label {\n  white-space: nowrap;\n  font-weight: 400;\n  font-size: 14px;\n  flex-basis: 100%;\n  text-align: center;\n}\n\n.timerange__label:first-child,\n.timerange__label:last-child {\n  flex-basis: 50%;\n}\n\n.timerange__label:first-child {\n  text-align: start;\n}\n\n.timerange__label:last-child {\n  text-align: end;\n}\n\n.timerange__item_checked .timerange__focus {\n  fill: #f100ae;\n  stroke: #f100ae;\n}\n\n.timerange__item_checked + .timerange__item::before {\n  background-color: #f100ae;\n}\n\n.timerange__wrp {\n  position: relative;\n}\n\n.timerange__tooltip {\n  display: none;\n  position: absolute;\n  background-color: var(--color-black);\n  border-radius: 4px;\n  padding: 4px 12px;\n  font-weight: 400;\n  font-size: 12px;\n  white-space: nowrap;\n  transform: translateY(-100%);\n}\n\n.timerange__tooltip::after {\n  content: \"\";\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 8px 4px 0 4px;\n  border-color: #111111 transparent transparent transparent;\n  left: 50%;\n  transform: translateX(-50%);\n  bottom: -8px;\n}\n\n.timerange__item:hover .timerange__tooltip {\n  display: block;\n}\n\n.timerange__label_mob {\n  display: none;\n}\n\n@media (max-width: 768px) {\n  .timerange__box {\n    width: 2px;\n  }\n  .timerange__label {\n    display: none;\n  }\n  .timerange__label_mob {\n    display: block;\n  }\n}")();

const formSection = "_formSection_1y6ua_1";
const formSection__header = "_formSection__header_1y6ua_8";
const formSection__clear = "_formSection__clear_1y6ua_16";
const formSection__fieldset = "_formSection__fieldset_1y6ua_39";
const formSection__fieldsetGrid = "_formSection__fieldsetGrid_1y6ua_45";
const formSection__itemsBlock = "_formSection__itemsBlock_1y6ua_53";
const formSection__duration = "_formSection__duration_1y6ua_64";
const fieldset_textInput = "_fieldset_textInput_1y6ua_69";
const dontKnow = "_dontKnow_1y6ua_78";
const formSection__contacts = "_formSection__contacts_1y6ua_82";
const formSection__caption = "_formSection__caption_1y6ua_89";
var styles$1 = {
	formSection: formSection,
	formSection__header: formSection__header,
	formSection__clear: formSection__clear,
	formSection__fieldset: formSection__fieldset,
	formSection__fieldsetGrid: formSection__fieldsetGrid,
	formSection__itemsBlock: formSection__itemsBlock,
	formSection__duration: formSection__duration,
	fieldset_textInput: fieldset_textInput,
	dontKnow: dontKnow,
	formSection__contacts: formSection__contacts,
	formSection__caption: formSection__caption
};

const checkbox__label = "_checkbox__label_v371m_1";
const checkbox__input = "_checkbox__input_v371m_10";
const checkbox__box = "_checkbox__box_v371m_17";
const checkbox__focus = "_checkbox__focus_v371m_23";
const checkbox__mark = "_checkbox__mark_v371m_34";
var styles = {
	checkbox__label: checkbox__label,
	checkbox__input: checkbox__input,
	checkbox__box: checkbox__box,
	checkbox__focus: checkbox__focus,
	checkbox__mark: checkbox__mark
};

export { styles$2 as a, styles$1 as b, styles as c, styles$4 as d, styles$3 as s };
