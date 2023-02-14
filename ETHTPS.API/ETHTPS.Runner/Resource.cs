using Konsole;

namespace ETHTPS.Runner
{
    public class SystemResource
    {
        private readonly Func<double>? _valueGetter;
        public SystemResource(string name, string unit, int? padLeft = 0)
        {
            Name = name;
            Unit = unit;
            if (padLeft.HasValue)
            {
                Name = Name.PadLeft(padLeft.Value);
            }
        }

        public SystemResource(string name, string unit, Func<double> valueGetter, Func<double> maxGetter) : this(name, unit)
        {
            Max = maxGetter();
            _valueGetter = valueGetter;
        }
        private double _value = 0;
        public double Value
        {
            get
            {
                return (_valueGetter == null) ? _value : _valueGetter();
            }
            set
            {
                _value = value;
            }
        }
        public double Max { get; set; } = 0;
        public string Name { get; private set; }
        public string Unit { get; private set; }
    }
}
