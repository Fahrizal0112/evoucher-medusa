import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between border border-cyan-100/10 bg-black/20 p-4">
      <div>
        <Heading level="h2" className="txt-xlarge text-white">
          Already have an account?
        </Heading>
        <Text className="txt-medium mt-2 text-slate-400">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 border border-cyan-100/20 bg-white/[0.08] text-white transition-colors hover:bg-white/15"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
