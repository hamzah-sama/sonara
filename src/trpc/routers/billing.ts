import { polar } from "@/lib/polar";
import { createTRPCRouter, orgProcedure } from "../init";
import { env } from "@/lib/env";
import { TRPCError } from "@trpc/server";
import { c } from "openapi-typescript";

export const biilingRouter = createTRPCRouter({
  createCheckout: orgProcedure.mutation(async ({ ctx }) => {
    try {
      const result = await polar.checkouts.create({
        products: [env.POLAR_PRODUCT_ID],
        externalCustomerId: ctx.orgId,
        successUrl: env.APP_URL,
      });

      return {
        checkoutUrl: result.url,
      };
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create checkout session",
      });
    }
  }),

  createPortalSession: orgProcedure.mutation(async ({ ctx }) => {
    const result = await polar.customerSessions.create({
      externalCustomerId: ctx.orgId,
    });

    if (!result.customerPortalUrl) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "failed to create portal session",
      });
    }

    return {
      portalUrl: result.customerPortalUrl,
    };
  }),

  getStatus: orgProcedure.query(async ({ ctx }) => {
    try {
      const customerState = await polar.customers.getStateExternal({
        externalId: ctx.orgId,
      });
      const hasActiveSubscription =
        (customerState?.activeSubscriptions ?? []).length > 0;

      let estimatedCost = 0;

      for (const sub of customerState?.activeSubscriptions ?? []) {
        for (const meter of sub.meters) {
          estimatedCost += meter.amount ?? 0;
        }
      }

      return {
        hasActiveSubscription,
        customerId: customerState.id,
        estimatedCost,
      };
    } catch (error) {
      return {
        hasActiveSubscription: false,
        estimatedCost: 0,
        customerId: null,
      };
    }
  }),
});
