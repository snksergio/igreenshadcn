/**
 * @igreen/design-system
 * 
 * Meta-package local - para Storybook e desenvolvimento
 * 
 * Nota: Este arquivo é diferente da versão publicada no NPM.
 * Quando publicado, os componentes são instalados como dependências.
 */

// Exportar apenas utils (sempre funciona)
export * from '@igreen/utils'

// Para o Storybook funcionar, os componentes devem ser importados diretamente dos pacotes
// A importação acontece nas stories, não aqui
