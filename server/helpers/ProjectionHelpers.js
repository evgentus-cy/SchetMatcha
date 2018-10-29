function GenerateProjection (info) {
  let projections = [];

  const pushArgs = (selections, currentNamespace = '') => {
    selections.map((selection) => {
      if (selection.selectionSet !== undefined) {
        let nextNamespace = currentNamespace !== '' ? [currentNamespace, selection.name.value].join('.') : selection.name.value;
        pushArgs(selection.selectionSet.selections, nextNamespace);
      } else {
        let field = currentNamespace !== '' ? [currentNamespace, selection.name.value].join('.') : selection.name.value;
        projections.push(field);
      }
    })
  }

  pushArgs(info.fieldNodes[0].selectionSet.selections)

  return projections.join(' ')
}

module.exports = {
  GenerateProjection
}