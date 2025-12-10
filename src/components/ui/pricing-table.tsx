import React from 'react';

import { cn } from '@/lib/utils';

import { CheckIcon, LucideIcon, MinusIcon } from 'lucide-react';

import { Badge } from './badge';

function PricingTable({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto overflow-y-visible"
		>
			<table className={cn('w-full text-base table-fixed', className)} {...props} />
		</div>
	);
}

function PricingTableHeader({ ...props }: React.ComponentProps<'thead'>) {
	return <thead data-slot="table-header" {...props} />;
}

function PricingTableBody({
	className,
	...props
}: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr]:divide-x [&_tr]:divide-border [&_tr]:border-b [&_tr]:border-border', className)}
			{...props}
		/>
	);
}

function PricingTableRow({ ...props }: React.ComponentProps<'tr'>) {
	return <tr data-slot="table-row" {...props} />;
}

function PricingTableCell({
	className,
	children,
	...props
}: React.ComponentProps<'td'> & { children: boolean | string }) {
	return (
		<td
			data-slot="table-cell"
			className={cn('p-6 align-middle whitespace-nowrap text-foreground text-base', className)}
			{...props}
		>
			{children === true ? (
				<CheckIcon aria-hidden="true" className="size-5 text-foreground" />
			) : children === false ? (
				<MinusIcon
					aria-hidden="true"
					className="text-muted-foreground size-5"
				/>
			) : (
				children
			)}
		</td>
	);
}

function PricingTableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
				className={cn(
				'p-6 text-left align-middle font-semibold whitespace-nowrap text-foreground text-base',
				className,
			)}
			{...props}
		/>
	);
}

function PricingTablePlan({
	name,
	badge,
	price,
	compareAt,
	icon: Icon,
	children,
	className,
	...props
}: React.ComponentProps<'div'> & PricingPlanType) {
	return (
		<div
			className={cn(
				'bg-card supports-[backdrop-filter]:bg-card/40 relative h-full overflow-hidden rounded-lg border-2 border-border shadow-xl p-6 font-normal backdrop-blur-xs',
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-3 mb-6">
				<div className="flex items-center justify-center rounded-full border p-2 border-border">
					{Icon && <Icon className="h-4 w-4 text-foreground" />}
				</div>
				<h3 className="text-foreground font-semibold text-lg uppercase tracking-wide">{name}</h3>
				<Badge
					variant="secondary"
					className="ml-auto rounded-full border px-3 py-1 text-xs font-medium bg-muted text-foreground border-border"
				>
					{badge}
				</Badge>
			</div>

			<div className="mt-6 flex items-baseline gap-3 mb-6">
				<span className="text-5xl font-bold text-foreground tracking-tight">{price}</span>
				{compareAt && (
					<span className="text-muted-foreground text-lg line-through font-medium">
						{compareAt}
					</span>
				)}
			</div>
			<div className="relative z-10 mt-6">{children}</div>
		</div>
	);
}

type PricingPlanType = {
	name: string;
	icon: LucideIcon;
	badge: string;
	price: string;
	compareAt?: string;
};

type FeatureValue = boolean | string;

type FeatureItem = {
	label: string;
	values: FeatureValue[];
};

export {
	type PricingPlanType,
	type FeatureValue,
	type FeatureItem,
	PricingTable,
	PricingTableHeader,
	PricingTableBody,
	PricingTableRow,
	PricingTableHead,
	PricingTableCell,
	PricingTablePlan,
};

