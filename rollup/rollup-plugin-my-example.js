export default function () {
  return {
    name: 'my-example',
    buildStart() {
      console.log('buildStart')
    },
    buildEnd() {
      console.log('buildEnd')
    },
    renderStart() {
      console.log('renderStart')
    },
    generateBundle() {
      console.log('generateBundle')
    },
    load(id) {
      console.log('load', id)
    },
    intro: '// intro',
    outro: '// outro'
  }
}