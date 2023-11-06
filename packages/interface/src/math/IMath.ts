import { IObject } from '../data/IData'

export interface IPointData {
    x: number
    y: number
}

export interface IPoint extends IPointData {
    set(x?: number | IPointData, y?: number): IPointData
    get(): IPointData
    copy(point: IPointData): IPoint
    clone(): IPoint

    rotate(angle: number, center?: IPointData): IPoint

    toInnerOf(matrix: IMatrixData, to?: IPointData): IPoint
    toOuterOf(matrix: IMatrixData, to?: IPointData): IPoint

    getCenter(to: IPointData): IPointData
    getDistance(to: IPointData): number
    getAngle(to: IPointData): number
    getAtan2(to: IPointData): number

    reset(): void
}

export interface IRadiusPointData extends IPointData {
    radiusX: number
    radiusY: number
}

export interface ISizeData {
    width: number
    height: number
}
export interface ISize extends ISizeData {

}

export interface IScreenSizeData extends ISizeData {
    pixelRatio?: number
}

export interface IBoundsData extends IPointData, ISizeData { }

export interface IOffsetBoundsData extends IBoundsData {
    offsetX: number
    offsetY: number
}

export interface IBoundsDataHandle {
    (target: any): IBoundsData
}

export interface IBounds extends IBoundsData {
    set(x?: number | IBoundsData, y?: number, width?: number, height?: number): IBounds
    get(): IBoundsData
    copy(bounds: IBoundsData): IBounds
    clone(): IBounds

    scale(scaleX: number, scaleY?: number): IBounds
    scaleOf(origin: IPointData, scaleX: number, scaleY?: number): IBounds
    toOuterOf(matrix: IMatrixData, to?: IBoundsData): IBounds
    getFitMatrix(put: IBoundsData): IMatrix

    spread(spreadX: number, spreadY?: number): IBounds
    ceil(): IBounds
    unsign(): IBounds

    add(bounds: IBoundsData): IBounds
    addList(boundsList: IBounds[]): IBounds
    setByList(boundsList: IBounds[], addMode?: boolean): IBounds
    addListWithHandle(list: IObject[], boundsDataHandle: IBoundsDataHandle): IBounds
    setByListWithHandle(list: IObject[], boundsDataHandle: IBoundsDataHandle, addMode?: boolean): IBounds

    setByPoints(points: IPointData[]): IBounds
    getPoints(): IPointData[] // topLeft, topRight, bottomRight, bottomLeft

    hitPoint(point: IPointData, pointMatrix?: IMatrixData): boolean
    hitRadiusPoint(point: IRadiusPointData, pointMatrix?: IMatrixWithLayoutData): boolean
    hit(bounds: IBoundsData, boundsMatrix?: IMatrixData): boolean
    includes(bounds: IBoundsData, boundsMatrix?: IMatrixData): boolean

    intersect(bounds: IBoundsData, boundsMatrix?: IMatrixData): IBounds
    getIntersect(bounds: IBoundsData, boundsMatrix?: IMatrixData): IBounds

    isSame(bounds: IBoundsData): boolean
    isEmpty(): boolean
    reset(): void
}

export interface ITwoPointBoundsData {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

export interface ITwoPointBounds extends ITwoPointBoundsData {
    addPoint(x: number, y: number): void
    addBounds(x: number, y: number, width: number, height: number): void
    add(pointBounds: ITwoPointBoundsData): void
}


export interface IAutoBoundsData {
    top?: number
    right?: number
    bottom?: number
    left?: number

    width?: number
    height?: number
}


export interface IAutoBounds extends IAutoBoundsData {
    set(top?: number, right?: number, bottom?: number, left?: number, width?: number, height?: number): void
    copy(auto: IAutoBoundsData): void
    getBoundsFrom(parent: ISizeData): IBounds
}


export interface IMatrixData {
    a: number
    b: number
    c: number
    d: number
    e: number
    f: number
}

export interface IScaleRotationData {
    scaleX: number
    scaleY: number
    rotation: number
}

export interface ISkewData {
    skewX: number
    skewY: number
}

export interface IOrientPointData extends IScaleRotationData, ISkewData, IPointData {
}

export type IOrientPointAttr =
    | 'x'
    | 'y'
    | 'scaleX'
    | 'scaleY'
    | 'rotation'
    | 'skewX'
    | 'skewY'


export interface IOrientBoundsData extends IOrientPointData, IBoundsData {
}
export interface IMatrix extends IMatrixData {
    set(a: number | IMatrixData, b: number, c: number, d: number, e: number, f: number): IMatrix
    get(): IMatrixData
    copy(matrix: IMatrixData): IMatrix
    clone(): IMatrix

    translate(x: number, y: number): IMatrix
    translateInner(x: number, y: number): IMatrix

    scale(x: number, y?: number): IMatrix
    scaleOfOuter(origin: IPointData, x: number, y?: number): IMatrix
    scaleOfInner(origin: IPointData, x: number, y?: number): IMatrix

    rotate(angle: number): IMatrix
    rotateOfOuter(origin: IPointData, angle: number): IMatrix
    rotateOfInner(origin: IPointData, angle: number): IMatrix

    skew(x: number, y?: number): IMatrix
    skewOfOuter(origin: IPointData, x: number, y?: number): IMatrix
    skewOfInner(origin: IPointData, x: number, y?: number): IMatrix

    multiply(child: IMatrixData): IMatrix
    multiplyParent(parent: IMatrixData): IMatrix

    divide(child: IMatrixData): IMatrix
    divideParent(parent: IMatrixData): IMatrix
    invert(): IMatrix

    toOuterPoint(inner: IPointData, to?: IPointData, distance?: boolean): void
    toInnerPoint(outer: IPointData, to?: IPointData, distance?: boolean): void

    setLayout(data: IOrientPointData, origin?: IPointData): IMatrix
    getLayout(origin?: IPointData, firstSkewY?: boolean): IOrientPointData

    reset(): void
}

export interface IMatrixWithBoundsData extends IMatrixData, IBoundsData { }

export interface IMatrixWithLayoutData extends IMatrixData, IOrientBoundsData { }
