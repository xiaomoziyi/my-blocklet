/**
 * 获得校验规则
 * @param {*} text
 * @param {*} params {required = true, maxLen = 20, select = false, pattern = null, validateLen = true }
 * @examples
 * getNormalRules('手机号, {pattern: 手机正则,validateLen: false }) => [{required: true, message: '请输入手机号'}, {pattern: 手机正则, message: '请输入正确的手机号'}]
 */
export function getNormalRules(text, params = {}) {
  const { required = true, maxLen = 20, select = false, pattern = null, validateLen = true } = params;
  const rules = [];
  const oprerate = select ? '请选择' : '请输入';
  if (required) {
    rules.push({
      required: true,
      message: `${oprerate}${text}`,
    });
  }
  if (!select && validateLen) {
    rules.push({
      max: maxLen,
      message: `${oprerate}不超过${maxLen}个字的${text}`,
    });
  }
  if (pattern) {
    rules.push({
      pattern,
      message: `${oprerate}正确的${text}`,
    });
  }
  return rules;
}
