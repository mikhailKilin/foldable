enum WidgetSize {
	SingleColumn,
	DoubleColumn,
}

enum WidgetType {
	ProgressToGoal,
	CumulativeReturn,
	MarketValue,
	ContactAdvisor,
	RatesOfReturn,
	RecentDocuments,
	AssetAllocation,
}

type TSizableWidgetType = WidgetType.AssetAllocation | WidgetType.CumulativeReturn;
type TDefaultWidgetType =
	| WidgetType.ContactAdvisor
	| WidgetType.MarketValue
	| WidgetType.RatesOfReturn
	| WidgetType.RecentDocuments;
type TGoalWidgetType =  WidgetType.ProgressToGoal

const fromWidgetSizeToString = (size: WidgetSize): string => {
	switch(size) {
		case WidgetSize.SingleColumn: return 'SingleColumn'
		case WidgetSize.DoubleColumn: return 'DoubleColumn'
	}
}

const fromWidgetTypeToString = (type: WidgetType): string => {
	switch(type) {
		case WidgetType.ProgressToGoal: return 'ProgressToGoal'
		case WidgetType.CumulativeReturn: return 'CumulativeReturn'
		case WidgetType.MarketValue: return 'MarketValue'
		case WidgetType.ContactAdvisor: return 'ContactAdvisor'
		case WidgetType.RatesOfReturn: return 'RatesOfReturn'
		case WidgetType.RecentDocuments: return 'RecentDocuments'
		case WidgetType.AssetAllocation: return 'AssetAllocation'
	}
}

class TGoalWidget {
	type: TGoalWidgetType;
	size: WidgetSize.SingleColumn;
	someProp: number

	constructor(type:TGoalWidgetType, size: WidgetSize.SingleColumn, someProp: number) {
		this.type = type;
		this.size = size;
		this.someProp = someProp;
	}

	fold<T>(sizableFunc: (type: TSizableWidgetType, size: WidgetSize)=> T, 
	goalFunc: (type: TGoalWidgetType, size: WidgetSize.SingleColumn, someProp: number) => T, 
	defaultFunc: (type: TDefaultWidgetType, size: WidgetSize.SingleColumn) => T) {
		return goalFunc(this.type, this.size,this.someProp)
	}
}

class TSizableWidget {
	type: TSizableWidgetType;
	size: WidgetSize;

	constructor(type: TSizableWidgetType, size: WidgetSize) {
		this.type = type;
		this.size = size;
	}

	fold<T>(sizableFunc: (type: TSizableWidgetType, size: WidgetSize)=> T, 
	goalFunc: (type: TGoalWidgetType, size: WidgetSize.SingleColumn,someProp: number) => T, 
	defaultFunc: (type: TDefaultWidgetType, size: WidgetSize.SingleColumn) => T) {
		return sizableFunc(this.type, this.size)
	}
}

class TDefaultWidget {
	type: TDefaultWidgetType;
	size: WidgetSize.SingleColumn;

	constructor(type:TDefaultWidgetType) {
		this.type = type;
		this.size = WidgetSize.SingleColumn;
	}

	fold<T>(sizableFunc: (type: TSizableWidgetType, size: WidgetSize)=> T, 
	goalFunc: (type: TGoalWidgetType, size: WidgetSize.SingleColumn,someProp: number) => T, 
	defaultFunc: (type: TDefaultWidgetType, size: WidgetSize.SingleColumn) => T) {
		return defaultFunc(this.type, this.size)
	}
}

type TWidget = TGoalWidget | TSizableWidget | TDefaultWidget

const liftGoal = (numb: number): TWidget => new TGoalWidget(WidgetType.ProgressToGoal, WidgetSize.SingleColumn, numb);
const liftSizable = (type: TSizableWidgetType, size: WidgetSize): TWidget => new TSizableWidget(type, size);
const liftDefault = (type: TDefaultWidgetType): TWidget => new TDefaultWidget(type)

const goalWidget = liftGoal(4);
const sizableWidget = liftSizable(WidgetType.AssetAllocation, WidgetSize.DoubleColumn);
const defaultWidget = liftDefault( WidgetType.ContactAdvisor);

const renderWidgetClass = (widget: TWidget): string => {
	return widget.fold(
		(type: TSizableWidgetType,size: WidgetSize) => {
		return `${fromWidgetTypeToString(type)}_${fromWidgetSizeToString(size)}`
	}, (type: TGoalWidgetType, size: WidgetSize.SingleColumn,numb: number) => `${fromWidgetTypeToString(type)}_${fromWidgetSizeToString(size)}_${numb}`, 
	(type: TDefaultWidgetType, size: WidgetSize.SingleColumn) => `${fromWidgetTypeToString(type)}_${fromWidgetSizeToString(size)}`)
}

console.log('fold goal widget', renderWidgetClass(goalWidget));
console.log('fold sizable widget',renderWidgetClass(sizableWidget));
console.log('fold default widget', renderWidgetClass(defaultWidget));

const getIdentityWidget = (widget: TWidget): TWidget => {
	return widget.fold((type: TSizableWidgetType, size: WidgetSize) => liftSizable(type, size), 
	(type: TGoalWidgetType, size: WidgetSize.SingleColumn,numb: number) => liftGoal(numb), (type: TDefaultWidgetType, size: WidgetSize.SingleColumn) => liftDefault(type))
}

console.log('is identity', renderWidgetClass(getIdentityWidget(goalWidget)) === renderWidgetClass(goalWidget))