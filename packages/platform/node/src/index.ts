export * from '@leafer/core'
export * from '@leafer/partner'

export * from '@leafer/canvas-node'
export * from '@leafer/image-web'

import { ICreator, IFunction, IObject } from '@leafer/interface'
import { Platform, Creator } from '@leafer/core'

import { LeaferCanvas } from '@leafer/canvas-node'
import { LeaferImage } from '@leafer/image-node'
import { InteractionBase } from '@leafer/interaction'


Object.assign(Creator, {
    canvas: (options?, manager?) => new LeaferCanvas(options, manager),
    image: (options) => new LeaferImage(options),
    hitCanvas: (options?, manager?) => new LeaferCanvas(options, manager),

    interaction: (target, canvas, selector, options?) => { return new InteractionBase(target, canvas, selector, options) }
} as ICreator)

Platform.requestRender = function (render: IFunction): void { setTimeout(render) }
Platform.devicePixelRatio = devicePixelRatio
Platform.conicGradientSupport = true

export function useSkiaCanvas(skia: IObject): void {
    const { Canvas, loadImage } = skia
    Platform.origin = {
        createCanvas: (width: number, height: number) => new Canvas(width, height),
        loadImage
    }
    Platform.canvas = Creator.canvas()
}