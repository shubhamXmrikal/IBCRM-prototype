"use client";

import React from "react";
import { Customer } from "../../../domain/customer/Customer";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Facebook, 
  Twitter, 
  Linkedin,
  Star,
  Copy,
  ExternalLink
} from "lucide-react";
import { cn } from "../../../lib/utils";
import VIPStatusBadge from "./VIPStatusBadge";

interface SubscriberCardProps {
  customer: Customer;
}

export default function SubscriberCard({ customer }: SubscriberCardProps) {
  const isActive = customer.metrics.status === "ACTIVE";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-white/5 shadow-2xl">
      {/* Header with Status & VIP */}
      <div className="p-4 bg-gradient-to-br from-white/5 to-transparent border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} 
                alt={customer.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {customer.flags.isVIPCustomer && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center border-2 border-[#0B0F1A] shadow-lg shadow-amber-500/20">
                <Star size={10} fill="white" className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2 group">
                {customer.name}
                <ExternalLink size={12} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
              </h2>
              <VIPStatusBadge vcNumber={customer.vcNumber} />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn(
                "text-[9px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase",
                isActive ? "bg-emerald-500/20 text-emerald-500" : "bg-rose-500/20 text-rose-500"
              )}>
                {customer.metrics.status}
              </span>
              <span className="text-[10px] font-mono text-slate-500">ID: {customer.smsId}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">VC Number</div>
          <div 
            className="text-xs font-mono font-bold text-orange-500 flex items-center gap-2 justify-end cursor-pointer hover:text-orange-400 transition-colors"
            onClick={() => copyToClipboard(customer.vcNumber)}
          >
            {customer.vcNumber}
            <Copy size={10} className="text-slate-600" />
          </div>
        </div>
      </div>

      {/* Grid of Details */}
      <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Contact Info */}
        <div className="space-y-3">
          <DetailItem 
            icon={Phone} 
            label="Registered Mobile" 
            value={customer.contact.rmn} 
            subValue={customer.contact.isDNCMob1 ? "DNC Active" : "Non-DNC"}
            isCopyable
          />
          <DetailItem 
            icon={Mail} 
            label="Email Address" 
            value={customer.contact.email} 
            subValue={customer.contact.isEmailConfirmed ? "Verified" : "Unverified"}
            isCopyable
          />
        </div>

        {/* Account Details */}
        <div className="space-y-3">
          <DetailItem 
            icon={Calendar} 
            label="Activation Date" 
            value={new Date(customer.metrics.activationDate).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} 
          />
          <DetailItem 
            icon={CreditCard} 
            label="Billing Type" 
            value={customer.metrics.paytermName} 
            subValue={customer.flags.isPostPaidCust ? "Postpaid" : "Prepaid"}
          />
        </div>

        {/* Full Address Span */}
        <div className="col-span-2 pt-2 border-t border-white/5">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-white/5 mt-0.5">
              <MapPin size={14} className="text-slate-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Installation Address</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {customer.address.line1}, {customer.address.line2 && `${customer.address.line2}, `}
                {customer.address.landmark && `Near ${customer.address.landmark}, `}
                {customer.address.city}, {customer.address.state} - {customer.address.pin}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Badges */}
      <div className="mt-auto p-4 pt-0 flex items-center justify-between border-t border-white/5 bg-white/[0.02]">
        <div className="flex gap-3">
          <SocialIcon Icon={Facebook} active={!!customer.contact.facebook} />
          <SocialIcon Icon={Twitter} active={!!customer.contact.twitter} />
          <SocialIcon Icon={Linkedin} active={!!customer.contact.linkedin} />
        </div>
        <div className="flex gap-1.5">
           {customer.flags.isHDSubs && <Badge label="HD" color="bg-blue-500/20 text-blue-500" />}
           {customer.flags.isCorporate && <Badge label="CORP" color="bg-purple-500/20 text-purple-500" />}
           {customer.isGoMulti && <Badge label="MULTI" color="bg-orange-500/20 text-orange-500" />}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value, subValue, isCopyable }: { 
  icon: any, 
  label: string, 
  value: string, 
  subValue?: string,
  isCopyable?: boolean 
}) {
  return (
    <div className="flex items-start gap-2.5 group">
      <div className="p-1.5 rounded-lg bg-white/5 mt-0.5 group-hover:bg-white/10 transition-colors">
        <Icon size={14} className="text-slate-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-200 truncate">{value || 'N/A'}</span>
          {isCopyable && value && (
             <Copy 
               size={10} 
               className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-orange-500" 
               onClick={() => navigator.clipboard.writeText(value)}
             />
          )}
        </div>
        {subValue && <div className="text-[10px] text-slate-500 font-medium">{subValue}</div>}
      </div>
    </div>
  );
}

function SocialIcon({ Icon, active }: { Icon: any, active: boolean }) {
  return (
    <Icon 
      size={14} 
      className={cn(
        "transition-colors",
        active ? "text-slate-300 hover:text-white cursor-pointer" : "text-slate-700"
      )} 
    />
  );
}

function Badge({ label, color }: { label: string, color: string }) {
  return (
    <span className={cn(
      "text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest",
      color
    )}>
      {label}
    </span >
  );
}
