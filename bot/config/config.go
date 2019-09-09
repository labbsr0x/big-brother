package config

import (
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
)

const (
// flags
)

// Flags define the fields that will be passed via cmd
type Flags struct {
}

// WebBuilder defines the parametric information of a whisper server instance
type WebBuilder struct {
	*Flags
}

// AddFlags adds flags for Builder.
func AddFlags(flags *pflag.FlagSet) {

}

// InitFromViper initializes the web server builder with properties retrieved from Viper.
func (b *WebBuilder) InitFromViper(v *viper.Viper) *WebBuilder {
	flags := new(Flags)

	flags.check()

	return b
}

func (flags *Flags) check() {

}
